import { Notice } from "../domain/Notice";

export interface NoticeRepository {
  save: (notice: Notice) => Promise<void>;
  getAll: () => Promise<Notice[]>;
}
