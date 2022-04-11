import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { NoticeRepository } from "../repository/NoticeRepository";
import { IdGenerator } from "../utils/IdGenerator";
import { Scraper } from "../utils/Scraper";
import { ElMundoScrapper } from "./ElMundoScrapper";
import { ElPaisScrapper } from "./ElPaisScrapper";

export class UpdateFeedService {
  private repo: NoticeRepository;
  private scraper: Scraper;
  private idGenerator: IdGenerator;
  constructor(
    noticeRepo: NoticeRepository,
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
