import { Schema, model, connect } from "mongoose";
import { ElMundoDTO } from "../dto/ElMundoDTO";
import mongoose from "mongoose";
export class ElMundoMongoDB {
  id: mongoose.Types.ObjectId;
  title: string;
  url: string;

  constructor(id: string, title: string, url: string) {
    this.id = new mongoose.Types.ObjectId(id);
    this.title = title;
    this.url = url;
  }
}
