import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { IdGenerator } from "../utils/IdGenerator";
import { Scraper } from "../utils/Scraper";
import { ElMundoScrapper } from "./ElMundoScrapper";
import { ElPaisScrapper } from "./ElPaisScrapper";

export class UpdateFeed {
  private repo: NoticeMongoRepository;
  private scraper: Scraper;
  private idGenerator: IdGenerator;
  constructor(
    noticeRepo: NoticeMongoRepository,
    scraper: Scraper,
    idGenerator: IdGenerator
  ) {
    this.repo = noticeRepo;
    this.scraper = scraper;
    this.idGenerator = idGenerator;
  }
  async run() {
    await new ElMundoScrapper(this.repo, this.scraper, this.idGenerator).run();
    await new ElPaisScrapper(this.repo, this.scraper, this.idGenerator).run();
  }
}
