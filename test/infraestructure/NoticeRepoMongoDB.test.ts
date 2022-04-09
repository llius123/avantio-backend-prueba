import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Notice } from "../../src/domain/Notice";
import { ElMundoDTO } from "../../src/dto/ElMundoDTO";
import { ElMundoRepository } from "../../src/repository/ElMundoRepository";
import { connection } from "../../src/repository/MongoDBRepo";

describe("Notice repo", () => {
  beforeEach(async () => {
    connection({ db: "mongodb://mongodb:27017/infraestructure-test" });
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection("elmundos");
  });
  it(`
    GIVEN i have a notice
    WHEN i save it
    THEN the notice is saved
  `, async () => {
    // GIVEN
    const elMundoRepository = new ElMundoRepository();
    const notice = new Notice(
      new mongoose.Types.ObjectId()._id.toString(),
      "title",
      "url"
    );
    // WHEN
    await elMundoRepository.save(notice);
    // THEN
    const notices = await elMundoRepository.getAll();
    expect(notices[0]).toEqual(notice);
  });

  it(`
    GIVEN I have 2 notices
    WHEN i get all
    THEN i get all
  `, async () => {
    const elMundoRepository = new ElMundoRepository();
    const notice1 = new Notice(
      new mongoose.Types.ObjectId()._id.toString(),
      "title",
      "url"
    );
    const notice2 = new Notice(
      new mongoose.Types.ObjectId()._id.toString(),
      "title2",
      "url2"
    );
    // WHEN
    await elMundoRepository.save(notice1);
    await elMundoRepository.save(notice2);
    // THEN
    const notices = await elMundoRepository.getAll();
    expect(notices).toEqual([notice1, notice2]);
  });
});