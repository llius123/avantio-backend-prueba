import { ElMundoMongoDB } from "../entity/ElMundoMongoDB";
import { Schema, model, connect, ObjectId } from "mongoose";
import { ElMundoDTO } from "../dto/ElMundoDTO";
import mongoose from "mongoose";

const elMundoSchema = new Schema<ElMundoDTO>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

export class ElMundoRepository {
  private ElMundoModel = model<ElMundoDTO>("ElMundo", elMundoSchema);

  constructor() {}

  async save(elMundo: ElMundoMongoDB): Promise<void> {
    await connect("mongodb://mongodb:27017/database");
    mongoose.set("debug", true);
    const elMundoData = new this.ElMundoModel({
      _id: elMundo.id,
      id: elMundo.id,
      title: elMundo.title,
      url: elMundo.url,
    });
    await elMundoData.save();
  }
}
