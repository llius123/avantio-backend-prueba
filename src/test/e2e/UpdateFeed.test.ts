import mongoose from "mongoose";
import request from "supertest";
import { app, server } from "../../app";
import { connection } from "../../repository/MongoDBConnection";

describe("Update feed", () => {
  beforeEach(async () => {
    // connection({ db: "mongodb://mongodb:27017/infraestructure-test-e2e" });
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection("notices");
    server.close();
  });
  it(`
        GIVEN I want to use update feed service
        WHEN i get update feed service
        THEN it should return 200
    `, async () => {
    await request(app)
      .get("/updateFeed")
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ msg: "OK" });
      });
  });
});
