import rp from "request-promise";
import $ from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { ElMundo } from "../domain/ElMundo";

export class ElMundoScrapper {
  constructor() {}

  public async run() {
    const url = "https://www.elmundo.es/";

    const aHtmlTags: any = await rp(url)
      .then(function (html) {
        return $("a", html);
      })
      .catch(function (err) {
        //handle error
      });
    const elMundoData: ElMundo[] = this.loopATagHtmlElements(aHtmlTags);
    const elMundoDataFilteredByTitle = this.filterNewsByValidTitle(elMundoData);
    const elMundoDataRemovedDuplicated = this.removeDuplicateNews(
      elMundoDataFilteredByTitle
    );
  }

  private removeDuplicateNews(elMundoData: ElMundo[]): ElMundo[] {
    return [
      ...new Map(elMundoData.map((item) => [item["url"], item])).values(),
    ];
  }

  private filterNewsByValidTitle(elMundoData: ElMundo[]): ElMundo[] {
    return elMundoData.map((simpleNew) => {
      if (!+simpleNew.getTitle()) {
        return simpleNew;
      }
      return [];
    }) as ElMundo[];
  }

  private loopATagHtmlElements(element: any): ElMundo[] {
    const elMundoData: ElMundo[] = [];
    for (const link of element) {
      const url = link.attribs.href;
      const dateFormatted = this.getDateFormatted();

      if (url.includes(dateFormatted)) {
        const id = uuidv4();
        const title = this.getTitleFromLink(link);
        elMundoData.push(new ElMundo(id, title, url));
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
