import { Filter, NoticeRepository } from "./NoticeRepository";
import { Notice } from "../domain/Notice";
import { noticeMongoSchema } from "./MongoDBConnection";
import { mapElMundoDTOToElMundoDomain } from "../map/mapElMundoDTOToElMundoDomain";
import { NoticeDTO } from "../dto/NoticeDTO";

export class NoticeMongoRepository implements NoticeRepository {
  constructor() {}

  async save(elMundo: Notice): Promise<void> {
    await noticeMongoSchema.create({
      id: elMundo.getId(),
      title: elMundo.getTitle(),
      url: elMundo.getUrl(),
    });
  }

  async getAll(): Promise<Notice[]> {
    const notices = await noticeMongoSchema.find().exec();

    return notices.map(mapElMundoDTOToElMundoDomain);
  }

  async findOneBy(filter: Filter): Promise<Notice | null> {
    const noticeFromRepo = await noticeMongoSchema
      .findOne({ url: filter.url })
      .exec();
    if (noticeFromRepo) {
      return new Notice(
        noticeFromRepo.id,
        noticeFromRepo.title,
        noticeFromRepo.url
      );
    }
    return await null;
  }

  async get(): Promise<Notice[]> {
    const noticesElMundoFromRepo: NoticeDTO[] = await noticeMongoSchema
      .find({
        url: /elmundo/,
      })
      .limit(5);
    const noticesElPaisFromRepo: NoticeDTO[] = await noticeMongoSchema
      .find({
        url: /elpais/,
      })
      .limit(5);

    return noticesElMundoFromRepo
      .map(mapElMundoDTOToElMundoDomain)
      .concat(noticesElPaisFromRepo.map(mapElMundoDTOToElMundoDomain));
  }
}
