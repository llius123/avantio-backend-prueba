import express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { NoticeMongoRepository } from "./repository/NoticeMongoRepository";
import { connection } from "./repository/MongoDBConnection";
import { IdGeneratorMongoose } from "./utils/IdGeneratorMongoose";
import { ScraperRequestPromise } from "./utils/ScraperRequestPromise";
import { UpdateFeedService } from "./actions/UpdateFeedService";
import { GetFeed } from "./actions/GetFeed";
import { Notice } from "./domain/Notice";
import { mapElMundoDomainToElMundoDTO } from "./map/mapElMundoDomainToElMundoDTO";
import http from "http";
import { GetFeedById } from "./actions/GetFeedById";
import { DeleteFeed } from "./actions/DeleteFeed";
import { CreateFeed } from "./actions/CreateFeed";
import { UpdateFeed } from "./actions/UpdateFeed";

// Create Express server
export const app = express();
const port = 3000;

app.use(express.json());

app.get("/updateFeed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const scraper = new ScraperRequestPromise();
  const idGenerator = new IdGeneratorMongoose();
  const action = new UpdateFeedService(repo, scraper, idGenerator);
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
app.delete("/feed/:id", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const action = new DeleteFeed(repo);
  await action.run(req.params.id);
  return res.status(200).send({});
});
app.post("/feed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const action = new CreateFeed(repo);
  await action.run({
    id: req.body.id,
    title: req.body.title,
    url: req.body.url,
  });
  return res.status(200).send({});
});

app.put("/feed", async (req: Request, res: Response) => {
  const repo = new NoticeMongoRepository();
  const action = new UpdateFeed(repo);
  await action.run({
    id: req.body.id,
    title: req.body.title,
    url: req.body.url,
  });
  return res.status(200).send({});
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
