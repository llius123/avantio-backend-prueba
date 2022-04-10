import express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { ElMundoScrapper } from "./actions/ElMundoScrapper";
import { NoticeMongoRepository } from "./repository/NoticeMongoRepository";
import { ScraperRequestPromise } from "./utils/ScraperRequestPromise";
import { connection } from "./repository/MongoDBConnection";
import { IdGeneratorMongoose } from "./utils/IdGeneratorMongoose";
import { ScraperRequestPromiseV2 } from "./utils/ScraperRequestPromiseV2";
import { ElPaisScrapper } from "./actions/ElPaisScrapper";

// Create Express server
const app = express();
const port = 3000;

// Express configuration
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ msg: "Hello world" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
main();
async function main() {
  connection({ db: "mongodb://mongodb:27017/database" });
  // await mongoose.connect("mongodb://mongodb:27017/database");
  // ElPais -> utf8
  // ElMundo -> latin1
  const repo = new NoticeMongoRepository();
  const scraper = new ScraperRequestPromiseV2();
  const idGenerator = new IdGeneratorMongoose();
  const test = new ElPaisScrapper(repo, scraper, idGenerator);
  test.run();
}
