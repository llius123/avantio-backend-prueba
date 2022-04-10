import { Notice } from "../../src/domain/Notice";
import { NoticeRepository } from "../../src/repository/NoticeRepository";
export class ElMundoRepoMock implements NoticeRepository {
  constructor() {}

  async save(notice: Notice): Promise<void> {
    return await new Promise((res, rej) => {
      res();
    });
  }

  async getAll(): Promise<Notice[]> {
    return await new Promise((res, rej) => {
      res([]);
    });
  }
}
