import mongoose from "mongoose";
import { NoticeDTO } from "../dto/NoticeDTO";
import { Schema } from "mongoose";

const noticeSchema = new Schema<NoticeDTO>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

type TInput = {
  db: string;
};
export function connection({ db }: TInput, debug = false) {
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
    if (debug) {
      mongoose.set("debug", true);
    }
  };
  connect();

  mongoose.connection.on("disconnected", connect);
}

export const noticeMongoSchema = mongoose.model<NoticeDTO>(
  "notice",
  noticeSchema
);
