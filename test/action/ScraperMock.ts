import { Scraper } from "../../src/utils/Scraper";

export class ScraperMock implements Scraper {
  constructor() {}
  async run(url: string, htmlTagToScrap: string): Promise<any> {
    return await new Promise((res) => res(""));
  }
}
