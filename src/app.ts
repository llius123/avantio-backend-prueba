import express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { ElMundoScrapper } from "./actions/ElMundoScrapper";
import { ElPaisScrapper } from "./actions/ElPaisScrapper";
import { ElMundoRepository } from "./repository/ElMundoRepository";
import { ScraperRequestPromise } from "./utils/ScraperRequestPromise";
import mongoose from "mongoose";
import { connection } from "./repository/MongoDBRepo";

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
  const repo = new ElMundoRepository();
  const scraper = new ScraperRequestPromise();
  const test = new ElMundoScrapper(repo, scraper);
  test.run();
}
