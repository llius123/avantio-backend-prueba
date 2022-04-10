import { ElMundoMongoDB } from "../entity/ElMundoMongoDB";
import { Schema, model } from "mongoose";
import { ElMundoDTO } from "../dto/ElMundoDTO";
import mongoose from "mongoose";
import { Filter, NoticeRepository } from "./NoticeRepository";
import { Notice } from "../domain/Notice";
import { mapElMundoDomainToElMundoRepo } from "../map/mapElMundoDomainToElMundoRepo";
import ElMundo from "../repository/MongoDBRepo";
import { mapElMundoDTOToElMundoDomain } from "../map/mapElMundoDTOToElMundoDomain";

export class ElMundoRepository implements NoticeRepository {
  constructor() {}

  async save(elMundo: Notice): Promise<void> {
    await ElMundo.create({
      id: elMundo.getId(),
      title: elMundo.getTitle(),
      url: elMundo.getUrl(),
    });
  }

  async getAll(): Promise<Notice[]> {
    const notices = await ElMundo.find().exec();

    return notices.map(mapElMundoDTOToElMundoDomain);
  }

  async findOneBy(filter: Filter): Promise<Notice | null> {
    const noticeFromRepo = await ElMundo.findOne({ url: filter.url }).exec();
    if (noticeFromRepo) {
      return new Notice(
        noticeFromRepo.id,
        noticeFromRepo.title,
        noticeFromRepo.url
      );
    }
    return await null;
  }
}
