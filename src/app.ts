import express from "express";
import { Application, Request, Response } from "express";

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