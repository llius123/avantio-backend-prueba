import rp from "request-promise";
import $ from "cheerio";
import { Scraper } from "./Scraper";

export class ScraperRequestPromise implements Scraper {
  constructor() {}

  async run(url: string, htmlTagToScrap: string, encoding: "utf8" | "latin1") {
    return await rp({ url: url, encoding: encoding })
      .then(function (html) {
        return $(htmlTagToScrap, html);
      })
      .catch(function (err) {
        //handle error
      });
  }
}
