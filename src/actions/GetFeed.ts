import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";

export class GetFeed {
  private repo: NoticeMongoRepository;
  constructor(repo: NoticeMongoRepository) {
    this.repo = repo;
  }
  async run(): Promise<Notice[]> {
    return await this.repo.get();
  }
}
