import rp from "request-promise";
import $ from "cheerio";

export class ElPaisScrapper {
  constructor() {}
  public async run() {
    const url = "https://www.elpais.es/";

    const aHtmlTags: any = await rp(url)
      .then(function (html) {
        return $("a", html);
      })
      .catch(function (err) {
        //handle error
      });
    this.loopATagHtmlElements(aHtmlTags);
  }

  private loopATagHtmlElements(element: any) {
    for (const link of element) {
      const url = link.attribs.href;
      const dateFormatted = this.getDateFormatted();

      if (url.includes(dateFormatted)) {
        console.log(this.getTitleFromLink(link));
      }
    }
  }

  private getTitleFromLink(linkTagHtml: Element): string {
    const titleElement: any = linkTagHtml.children[0];
    return titleElement.data;
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
