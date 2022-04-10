import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import mongoose from "mongoose";
import { Scraper } from "../utils/Scraper";
import { IdGenerator } from "../utils/IdGenerator";
import { ScrapedData } from "../utils/ScraperRequestPromiseV2";

export class ElMundoScrapper {
  private repo: NoticeMongoRepository;
  private scraper: Scraper;
  private idGenerator: IdGenerator;
  private url = "https://www.elmundo.es/";
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
    const allLinks: ScrapedData[] = await this.scraper.run(
      this.url,
      "a",
      "latin1"
    );

    const allLinksFiltered: ScrapedData[] = this.removeBadLinks(allLinks);
    const allLinksFilteredByDate: ScrapedData[] =
      this.getLinksByDate(allLinksFiltered);
    const allLinksWithoutDuplicates: ScrapedData[] = this.removeDuplicateLinks(
      allLinksFilteredByDate
    );
    const allLinksWithoutComments: ScrapedData[] = this.removeCommentsLinks(
      allLinksWithoutDuplicates
    );
    await allLinksWithoutComments.forEach(async (link) => {
      await this.saveNotice(
        new Notice(this.idGenerator.run(), link.title, link.url)
      );
    });
  }

  private removeCommentsLinks(allLinks: ScrapedData[]): ScrapedData[] {
    const result: ScrapedData[] = [];
    allLinks.forEach((link) => {
      if (!link.url.includes("#ancla_comentarios")) {
        result.push(link);
      }
    });
    return result;
  }

  private removeDuplicateLinks(allLinks: ScrapedData[]): ScrapedData[] {
    return [...new Map(allLinks.map((item) => [item.title, item])).values()];
  }

  private getLinksByDate(allLinks: ScrapedData[]): ScrapedData[] {
    const result: ScrapedData[] = [];
    allLinks.forEach((link) => {
      if (link.url.includes(this.getDateFormatted())) {
        result.push(link);
      }
    });
    return result;
  }

  private removeBadLinks(allLinks: ScrapedData[]) {
    const allLinksWithoutEmpty = allLinks.map((link) => {
      if (link.title === "" || link.url === "") {
        return;
      }
      return link;
    });
    return allLinksWithoutEmpty as ScrapedData[];
  }

  private async saveNotice(notice: Notice): Promise<void> {
    const noticeInRepo = await this.repo.findOneBy({ url: notice.getUrl() });

    if (noticeInRepo) {
      return;
    }
    await this.repo.save(notice);
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
