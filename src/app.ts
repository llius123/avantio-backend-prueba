import express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { Test } from "./test/Test";

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

const test = new Test();
test.run();
