import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { NoticeRepository } from "../repository/NoticeRepository";

export class GetFeedById {
  private repo: NoticeRepository;
  constructor(repo: NoticeRepository) {
    this.repo = repo;
  }
  async run(feedId: string): Promise<Notice | null> {
    return await this.repo.getById(feedId);
  }
}
