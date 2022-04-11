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
import { GetFeed } from "./actions/GetFeed";
import { Notice } from "./domain/Notice";
import { mapElMundoDomainToElMundoDTO } from "./map/mapElMundoDomainToElMundoDTO";
import http from "http";
import { GetFeedById } from "./actions/GetFeedById";

// Create Express server
export const app = express();
const port = 3000;

app.get("/updateFeed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const scraper = new ScraperRequestPromiseV2();
  const idGenerator = new IdGeneratorMongoose();
  const action = new UpdateFeed(repo, scraper, idGenerator);
  await action.run();
  return res.status(200).send({ msg: "OK" });
});

app.get("/feed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const action = new GetFeed(repo);
  const feed: Notice[] = await action.run();
  return res.status(200).send(feed.map(mapElMundoDomainToElMundoDTO));
});
app.get("/feed/:id", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const action = new GetFeedById(repo);
  const feed: Notice | null = await action.run(req.params.id);
  return res.status(200).send(feed ? mapElMundoDomainToElMundoDTO(feed) : {});
});

// Express configuration
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ msg: "Hello world" });
});

export async function createServer(): Promise<http.Server> {
  if (process.env.ENVIRONMENT === "E2E") {
    await connection({
      db: "mongodb://mongodb:27017/infraestructure-test-e2e",
    });
    return app.listen();
  }
  await connection({ db: "mongodb://mongodb:27017/database" });
  return app.listen(port);
}

export let server: http.Server;
createServer().then((response) => {
  server = response;
});
