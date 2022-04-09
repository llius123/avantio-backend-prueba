import { Notice } from "../domain/Notice";
import { ElMundoRepository } from "../repository/ElMundoRepository";
import mongoose from "mongoose";
import { Scraper } from "../utils/Scraper";

export class ElMundoScrapper {
  private repo: ElMundoRepository;
  private scraper: Scraper;
  private url = "https://www.elmundo.es/";
  constructor(elMundoRepo: ElMundoRepository, Scraper: Scraper) {
    this.repo = elMundoRepo;
    this.scraper = Scraper;
  }

  public async run() {
    const allLinkTagsFromElMundo = await this.scraper.run(this.url, "a");

    const elMundoData: Notice[] = this.transformLinkTagsToDomainObject(
      allLinkTagsFromElMundo
    );

    const elMundoDataWithValidTitles =
      this.filterNoticesByValidTitle(elMundoData);

    const elMundoDataWithoutDuplicateNotices = this.removeDuplicateNews(
      elMundoDataWithValidTitles
    );

    for (
      let index = 0;
      index < elMundoDataWithoutDuplicateNotices.length;
      index++
    ) {
      await this.repo.save(elMundoDataWithoutDuplicateNotices[index]);
    }
  }

  private removeDuplicateNews(elMundoData: Notice[]): Notice[] {
    return [
      ...new Map(elMundoData.map((item) => [item.getTitle(), item])).values(),
    ];
  }

  private filterNoticesByValidTitle(allElMundoNotices: Notice[]): Notice[] {
    const result: Notice[] = [];
    allElMundoNotices.forEach((elMundoNotice) => {
      if (!elMundoNotice.isValid()) {
        return;
      }
      if (!+elMundoNotice.getTitle()) {
        result.push(elMundoNotice);
      }
    });
    return result;
  }

  private transformLinkTagsToDomainObject(
    htmlLinkTagsElements: any[]
  ): Notice[] {
    const elMundoDomainData: Notice[] = [];
    for (const htmlLinkTagElement of htmlLinkTagsElements) {
      const urlLinkTag = htmlLinkTagElement.attribs.href;
      const dateFormatted = this.getDateFormatted();

      if (urlLinkTag.includes(dateFormatted)) {
        const id = new mongoose.Types.ObjectId();
        const title = this.getTitleFromLink(htmlLinkTagElement);
        elMundoDomainData.push(
          new Notice(id._id.toString(), title, urlLinkTag)
        );
      }
    }
    return elMundoDomainData;
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
