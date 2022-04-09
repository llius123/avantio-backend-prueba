import { Notice } from "../domain/Notice";
import { ElMundoDTO } from "../dto/ElMundoDTO";

export function mapElMundoDTOToElMundoDomain(elMundoDTO: ElMundoDTO) {
  return new Notice(elMundoDTO.id, elMundoDTO.title, elMundoDTO.url);
}
