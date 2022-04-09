import { Notice } from "../domain/Notice";
import { ElMundoMongoDB } from "../entity/ElMundoMongoDB";

export function mapElMundoDomainToElMundoRepo(ElMundo: Notice): ElMundoMongoDB {
  return new ElMundoMongoDB(
    ElMundo.getId(),
    ElMundo.getTitle(),
    ElMundo.getUrl()
  );
}
