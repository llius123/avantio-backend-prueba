import { Notice } from "../../src/domain/Notice";
import {
  Filter,
  NoticeRepository,
} from "../../src/repository/NoticeRepository";
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

  async findOneBy(filter: Filter): Promise<Notice | null> {
    return await new Promise((res, rej) => {
      res(null);
    });
  }
}
