import mongoose from "mongoose";
import { IdGenerator } from "./IdGenerator";
export class IdGeneratorMongoose implements IdGenerator {
  constructor() {}

  run(): string {
    return new mongoose.Types.ObjectId().toString();
  }
}
