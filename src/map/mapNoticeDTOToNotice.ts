import { Notice } from "../domain/Notice";
import { NoticeDTO } from "../dto/NoticeDTO";

export function mapNoticeDTOToNotice(elMundoDTO: NoticeDTO) {
  return new Notice(elMundoDTO.id, elMundoDTO.title, elMundoDTO.url);
}
