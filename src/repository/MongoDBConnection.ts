import mongoose from "mongoose";
import { ElMundoDTO } from "../dto/ElMundoDTO";
import { Schema } from "mongoose";

const elMundoSchema = new Schema<ElMundoDTO>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

type TInput = {
  db: string;
};
export function connection({ db }: TInput) {
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
  };
  connect();

  mongoose.connection.on("disconnected", connect);
}

export default mongoose.model<ElMundoDTO>("ElMundo", elMundoSchema);
