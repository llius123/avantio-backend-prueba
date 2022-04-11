import { Notice } from "../domain/Notice";

export interface Filter {
  url: string;
}

export interface NoticeRepository {
  save: (notice: Notice) => Promise<void>;
  getAll: () => Promise<Notice[]>;
  findOneBy: (filter: Filter) => Promise<Notice | null>;
  get: () => Promise<Notice[]>;
  getById: (id: string) => Promise<Notice | null>;
  delete: (id: string) => Promise<void>;
}
