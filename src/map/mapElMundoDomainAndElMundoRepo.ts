import { ElMundo } from "../domain/ElMundo";
import { ElMundoMongoDB } from "../entity/ElMundoMongoDB";

export function mapElMundoDomainToElMundoRepo(
  ElMundo: ElMundo
): ElMundoMongoDB {
  return new ElMundoMongoDB(
    ElMundo.getId(),
    ElMundo.getTitle(),
    ElMundo.getUrl()
  );
}
