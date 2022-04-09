import { v4 as uuidv4 } from "uuid";
import { ElMundo } from "../domain/ElMundo";
import { ElMundoRepository } from "../repository/ElMundoRepository";
import { mapElMundoDomainToElMundoRepo } from "../map/mapElMundoDomainAndElMundoRepo";
import mongoose from "mongoose";
import { Scraper } from "../utils/Scraper";

export class ElMundoScrapper {
  private repo: ElMundoRepository;
  private scraper: Scraper;
  constructor(elMundoRepo: ElMundoRepository, Scraper: Scraper) {
    this.repo = elMundoRepo;
    this.scraper = Scraper;
  }

  public async run() {
    const url = "https://www.elmundo.es/";
    const aHtmlTags = await this.scraper.run(url, "a");

    const elMundoData: ElMundo[] = this.loopATagHtmlElements(aHtmlTags);
    const elMundoDataFilteredByTitle = this.filterNewsByValidTitle(elMundoData);
    const elMundoDataRemovedDuplicated = this.removeDuplicateNews(
      elMundoDataFilteredByTitle
    );
    for (let index = 0; index < elMundoDataRemovedDuplicated.length; index++) {
      await this.repo.save(
        mapElMundoDomainToElMundoRepo(elMundoDataRemovedDuplicated[index])
      );
    }
  }

  private removeDuplicateNews(elMundoData: ElMundo[]): ElMundo[] {
    return [
      ...new Map(elMundoData.map((item) => [item["title"], item])).values(),
    ];
  }

  private filterNewsByValidTitle(elMundoData: ElMundo[]): ElMundo[] {
    const result: ElMundo[] = [];
    elMundoData.forEach((simpleNew) => {
      if (!simpleNew.isValid()) {
        return;
      }
      if (!+simpleNew.getTitle()) {
        result.push(simpleNew);
      }
    });
    return result;
  }

  private loopATagHtmlElements(element: any): ElMundo[] {
    const elMundoData: ElMundo[] = [];
    for (const link of element) {
      const url = link.attribs.href;
      const dateFormatted = this.getDateFormatted();

      if (url.includes(dateFormatted)) {
        const id = new mongoose.Types.ObjectId();
        const title = this.getTitleFromLink(link);
        elMundoData.push(new ElMundo(id._id.toString(), title, url));
      }
    }
    return elMundoData;
  }

  private getTitleFromLink(linkTagHtml: Element): string {
    if (linkTagHtml.children[0].children === undefined) {
      return "";
    }

    const firstChildren: any = linkTagHtml.children[0].children[0];
    return firstChildren.data;
  }

  private getDateFormatted(): string {
    const date = new Date();
    return (
      date.getFullYear() +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + date.getDate()).slice(-2)
    );
  }
}
