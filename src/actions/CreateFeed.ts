import { Notice } from "../domain/Notice";
import { NoticeDTO } from "../dto/NoticeDTO";
import { mapNoticeDTOToNotice } from "../map/mapNoticeDTOToNotice";
import { NoticeMongoRepository } from "../repository/NoticeMongoRepository";
import { NoticeRepository } from "../repository/NoticeRepository";

export class CreateFeed {
  private repo: NoticeRepository;
  constructor(repo: NoticeRepository) {
    this.repo = repo;
  }
  async run(notice: NoticeDTO): Promise<void> {
    await this.repo.create(mapNoticeDTOToNotice(notice));
  }
}
