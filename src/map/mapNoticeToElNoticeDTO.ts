import { Notice } from "../domain/Notice";
import { NoticeDTO } from "../dto/NoticeDTO";

export function mapNoticeToElNoticeDTO(notice: Notice): NoticeDTO {
  return { id: notice.getId(), title: notice.getTitle(), url: notice.getUrl() };
}
