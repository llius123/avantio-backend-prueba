import { Notice } from "../../domain/Notice";
import { Filter, NoticeRepository } from "../../repository/NoticeRepository";
export class NoticeRepoMock implements NoticeRepository {
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
  async get(): Promise<Notice[]> {
    return await new Promise((res, rej) => {
      res([]);
    });
  }

  async getById(id: string): Promise<Notice | null> {
    return await new Promise((res, rej) => {
      res(null);
    });
  }

  async delete(id: string): Promise<void> {
    return await new Promise((res, rej) => {
      res();
    });
  }
}
