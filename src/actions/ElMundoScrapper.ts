import { Notice } from "../domain/Notice";
import { ElMundoRepository } from "../repository/ElMundoRepository";
import mongoose from "mongoose";
import { Scraper } from "../utils/Scraper";
import { IdGenerator } from "../utils/IdGenerator";

export class ElMundoScrapper {
  private repo: ElMundoRepository;
  private scraper: Scraper;
  private idGenerator: IdGenerator;
  private url = "https://www.elmundo.es/";
  constructor(
    elMundoRepo: ElMundoRepository,
    Scraper: Scraper,
    idGenerator: IdGenerator
  ) {
    this.repo = elMundoRepo;
    this.scraper = Scraper;
    this.idGenerator = idGenerator;
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
      await this.saveNotice(elMundoDataWithoutDuplicateNotices[index]);
    }
  }

  private async saveNotice(notice: Notice): Promise<void> {
    const noticeInRepo = await this.repo.findOneBy({ url: notice.getUrl() });

    if (noticeInRepo) {
      return;
    }
    await this.repo.save(notice);
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
        const id = this.idGenerator.run();
        const title = this.getTitleFromLink(htmlLinkTagElement);
        elMundoDomainData.push(new Notice(id, title, urlLinkTag));
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
