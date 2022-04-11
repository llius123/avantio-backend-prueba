import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { NoticeRepository } from "../repository/NoticeRepository";

export class DeleteFeed {
  private repo: NoticeRepository;
  constructor(repo: NoticeRepository) {
    this.repo = repo;
  }
  async run(feedId: string): Promise<void> {
    await this.repo.delete(feedId);
  }
}
