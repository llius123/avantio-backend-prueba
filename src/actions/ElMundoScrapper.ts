import rp from "request-promise";
import $ from "cheerio";

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
    this.loopATagHtmlElements(aHtmlTags);
  }

  private loopATagHtmlElements(element: any) {
    for (const link of element) {
      const url = link.attribs.href;
      const dateFormatted = this.getDateFormatted();

      if (
        url.includes(dateFormatted) &&
        url ===
          "https://www.elmundo.es/internacional/2022/04/08/624ffad9fc6c8312168b45bf.html"
      ) {
        console.log(this.getTitleFromLink(link));
      }
    }
  }

  private getTitleFromLink(linkTagHtml: Element): string {
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
