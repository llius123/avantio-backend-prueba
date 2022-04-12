import rp from "request-promise";
import $ from "cheerio";
import { Scraper } from "./Scraper";

export interface ScrapedData {
  title: string;
  url: string;
}

export class ScraperRequestPromise implements Scraper {
  constructor() {}

  async run(url: string, htmlTagToScrap: string, encoding: "utf8" | "latin1") {
    console.log(url, encoding);

    const all: any = await rp({ url: url, encoding: encoding })
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
    return result;
  }
}
