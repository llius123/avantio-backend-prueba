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
export const server = app.listen(port, () => {
  console.log("Environment: " + process.env.ENVIRONMENT);

  switch (process.env.ENVIRONMENT) {
    case "E2E":
      connection({ db: "mongodb://mongodb:27017/infraestructure-test-e2e" });
      break;
    case "PRODUCTION":
      connection({ db: "mongodb://mongodb:27017/database" });
      break;

    default:
      break;
  }
  console.log(`Example app listening on port ${port}`);
});
