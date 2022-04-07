import express from "express";
import { Application, Request, Response } from "express";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api", (req: Request, res: Response) => {
  return res.status(200).send({ msg: "hola" });
});

export default app;
