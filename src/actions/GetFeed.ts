import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { NoticeRepository } from "../repository/NoticeRepository";

export class GetFeed {
  private repo: NoticeRepository;
  constructor(repo: NoticeRepository) {
    this.repo = repo;
  }
  async run(): Promise<Notice[]> {
    return await this.repo.get();
  }
}
