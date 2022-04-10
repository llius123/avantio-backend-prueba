import { Notice } from "../domain/Notice";

export interface Filter {
  url: string;
}

export interface NoticeRepository {
  save: (notice: Notice) => Promise<void>;
  getAll: () => Promise<Notice[]>;
  findOneBy: (filter: Filter) => Promise<Notice | null>;
}
