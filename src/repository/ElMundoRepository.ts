import { ElMundoMongoDB } from "../entity/ElMundoMongoDB";
import { Schema, model } from "mongoose";
import { ElMundoDTO } from "../dto/ElMundoDTO";
import mongoose from "mongoose";
import { NoticeRepository } from "./NoticeRepository";
import { Notice } from "../domain/Notice";
import { mapElMundoDomainToElMundoRepo } from "../map/mapElMundoDomainToElMundoRepo";

const elMundoSchema = new Schema<ElMundoDTO>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});
const ElMundoModel = model<ElMundoDTO>("ElMundo", elMundoSchema);

export class ElMundoRepository implements NoticeRepository {
  constructor() {}

  async save(elMundo: Notice): Promise<void> {
    await mongoose.connect("mongodb://mongodb:27017/database");
    mongoose.set("debug", true);
    await new ElMundoModel(mapElMundoDomainToElMundoRepo(elMundo)).save();
    await mongoose.connection.close();
  }
}
