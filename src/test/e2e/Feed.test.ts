import { Notice } from "../../domain/Notice";
import { NoticeMongoRepository } from "../../repository/NoticeMongoRepository";
import { IdGeneratorMongoose } from "../../utils/IdGeneratorMongoose";
import request from "supertest";
import { app, server } from "../../app";
import { mapElMundoDomainToElMundoDTO } from "../../map/mapElMundoDomainToElMundoDTO";
import mongoose from "mongoose";
import { connection } from "../../repository/MongoDBConnection";

describe("Feed", () => {
  beforeAll(async () => {
    await mongoose.connection.dropDatabase();
  });
  afterEach(async () => {
    await mongoose.connection.dropCollection("notices");
    await server.close();
  });
  it(`
        GIVEN i have 17 news on repo
        WHEN i get the feed
        THEN i get 10 elements of the feed
    `, async () => {
    //GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const elMundoNotices: Notice[] = createElMundoNotices(7);
    const elPaisNotices: Notice[] = createElPaisNotices(7);
    for (const elMundoNotice of elMundoNotices) {
      await noticeRepo.save(elMundoNotice);
    }
    for (const elPaisNotice of elPaisNotices) {
      await noticeRepo.save(elPaisNotice);
    }
    const a = elMundoNotices.slice(0, 5);
    const b = elPaisNotices.slice(0, 5);
    //WHEN
    await request(app)
      .get("/feed")
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([
          ...a.map(mapElMundoDomainToElMundoDTO),
          ...b.map(mapElMundoDomainToElMundoDTO),
        ]);
      });
  });

  it(`
  GIVEN i have 1 new on repo
  WHEN i get by id the feed
  THEN i get the feed searched
`, async () => {
    //GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const notice = new Notice(idGenerator.run(), "Title", "url");
    await noticeRepo.save(notice);
    //WHEN
    await request(app)
      .get("/feed/" + notice.getId())
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ ...mapElMundoDomainToElMundoDTO(notice) });
      });
  });
  it(`
  GIVEN i have 1 new on repo
  WHEN i get by id the feed
  THEN i get the feed searched
`, async () => {
    //GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const notice = new Notice(idGenerator.run(), "Title", "url");
    await noticeRepo.save(notice);
    //WHEN
    await request(app)
      .delete("/feed/" + notice.getId())
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
      });

    await request(app)
      .get("/feed/" + notice.getId())
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({});
      });
  });
  it(`
  GIVEN i want to create a feed
  WHEN i send the feed to save
  THEN the feed is saved
`, async () => {
    //GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const notice = new Notice(idGenerator.run(), "Title", "url");
    await noticeRepo.save(notice);
    //WHEN
    await request(app)
      .post("/feed")
      .send({
        ...mapElMundoDomainToElMundoDTO(notice),
      })
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
      });
    await request(app)
      .get("/feed/" + notice.getId())
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ ...mapElMundoDomainToElMundoDTO(notice) });
      });
  });
  it(`
  GIVEN i want to update a feed
  WHEN i send the updated feed
  THEN the feed is updated
`, async () => {
    //GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const id = idGenerator.run();
    const notice = new Notice(id, "Title", "url");
    const notice2 = new Notice(id, "TitleUpdated", "urlUpdated");
    await noticeRepo.save(notice);
    //WHEN
    await request(app)
      .post("/feed")
      .send({
        ...mapElMundoDomainToElMundoDTO(notice),
      })
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
      });
    await request(app)
      .put("/feed")
      .send({
        ...mapElMundoDomainToElMundoDTO(notice2),
      })
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
      });
    await request(app)
      .get("/feed/" + notice.getId())
      .expect((res) => {
        // THEN
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ ...mapElMundoDomainToElMundoDTO(notice2) });
      });
  });
});

const idGenerator = new IdGeneratorMongoose();
function createElMundoNotices(numberOfItems: number): Notice[] {
  const result: Notice[] = [];
  for (let index = 0; index < numberOfItems; index++) {
    result.push(
      new Notice(idGenerator.run(), "Notice: " + index, "www.elmundo.es")
    );
  }
  return result;
}
function createElPaisNotices(numberOfItems: number): Notice[] {
  const result: Notice[] = [];
  for (let index = 0; index < numberOfItems; index++) {
    result.push(
      new Notice(idGenerator.run(), "Notice: " + index, "www.elpais.es")
    );
  }
  return result;
}
