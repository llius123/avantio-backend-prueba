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
import { UpdateFeed } from "./actions/UpdateFeed";

// Create Express server
const app = express();
const port = 3000;

app.get("/updateFeed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const scraper = new ScraperRequestPromiseV2();
  const idGenerator = new IdGeneratorMongoose();
  const action = new UpdateFeed(repo, scraper, idGenerator);
  await action.run();
  return res.status(200).send({ msg: "OK" });
});

// Express configuration
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ msg: "Hello world" });
});
app.listen(port, () => {
  connection({ db: "mongodb://mongodb:27017/database" });
  console.log(`Example app listening on port ${port}`);
});
