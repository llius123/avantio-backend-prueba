import rp from "request-promise";
import $ from "cheerio";
import { Scraper } from "./Scraper";

interface ScrapedData {
  title: string;
  url: string;
}

export class ScraperRequestPromiseV2 implements Scraper {
  constructor() {}

  async run(url: string, htmlTagToScrap: string) {
    const all: any = await rp({ url: url, encoding: "latin1" })
      .then(function (html) {
        const a = $.load(html);
        return a(htmlTagToScrap, html);
      })
      .catch(function (err) {
        //handle error
      });
    const result: ScrapedData[] = [];
    all.each((idx: any, element: any) => {
      result.push({
        url: $(element).attr().href,
        title: $(element).text(),
      });
    });
  }
}
