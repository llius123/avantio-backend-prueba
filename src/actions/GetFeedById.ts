import { Notice } from "../domain/Notice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";

export class GetFeedById {
  private repo: NoticeMongoRepository;
  constructor(repo: NoticeMongoRepository) {
    this.repo = repo;
  }
  async run(feedId: string): Promise<Notice | null> {
    return await this.repo.getById(feedId);
  }
}
