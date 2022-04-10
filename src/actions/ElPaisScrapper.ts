import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import mongoose from "mongoose";
import { Scraper } from "../utils/Scraper";
import { IdGenerator } from "../utils/IdGenerator";

export class ElPaisScrapper {
  private repo: NoticeMongoRepository;
  private scraper: Scraper;
  private idGenerator: IdGenerator;
  private url = "https://www.elpais.es";
  constructor(
    noticeRepo: NoticeMongoRepository,
    scraper: Scraper,
    idGenerator: IdGenerator
  ) {
    this.repo = noticeRepo;
    this.scraper = scraper;
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
      const urlLinkTag = this.url + htmlLinkTagElement.attribs.href;
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
    if (linkTagHtml.children[0] === undefined) {
      return "";
    }

    const firstChildren: any = linkTagHtml.children[0];

    if (firstChildren.data === undefined) {
      return "";
    }
    return firstChildren.data;
  }

  private getDateFormatted(): string {
    const date = new Date();
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  }
}

// import rp from "request-promise";
// import $ from "cheerio";

// export class ElPaisScrapper {
//   constructor() {}
//   public async run() {
//     const url = "https://www.elpais.es/";

//     const aHtmlTags: any = await rp(url)
//       .then(function (html) {
//         return $("a", html);
//       })
//       .catch(function (err) {
//         //handle error
//       });
//     this.loopATagHtmlElements(aHtmlTags);
//   }

//   private loopATagHtmlElements(element: any) {
//     for (const link of element) {
//       const url = link.attribs.href;
//       const dateFormatted = this.getDateFormatted();

//       if (url.includes(dateFormatted)) {
//         console.log(this.getTitleFromLink(link));
//       }
//     }
//   }

//   private getTitleFromLink(linkTagHtml: Element): string {
//     const titleElement: any = linkTagHtml.children[0];
//     return titleElement.data;
//   }

//   private getDateFormatted(): string {
//     const date = new Date();
//     return (
//       date.getFullYear() +
//       "-" +
//       ("0" + (date.getMonth() + 1)).slice(-2) +
//       "-" +
//       ("0" + date.getDate()).slice(-2)
//     );
//   }
// }
