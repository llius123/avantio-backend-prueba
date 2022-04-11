import mongoose from "mongoose";
import { Notice } from "../../domain/Notice";
import { NoticeMongoRepository } from "../../repository/NoticeMongoRepository";
import { connection } from "../../repository/MongoDBConnection";
import { IdGeneratorMongoose } from "../../utils/IdGeneratorMongoose";

describe("Notice repo", () => {
  beforeEach(async () => {
    connection({ db: "mongodb://mongodb:27017/infraestructure-test" });
  });

  afterEach(async () => {
    await mongoose.connection.dropCollection("notices");
  });
  it(`
    GIVEN i have a notice
    WHEN i save it
    THEN the notice is saved
  `, async () => {
    // GIVEN
    const elMundoRepository = new NoticeMongoRepository();
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
    const elMundoRepository = new NoticeMongoRepository();
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

  it(`
  GIVEN I have 1 notice in repo
  WHEN i search by url
  THEN i get the notice
`, async () => {
    const elMundoRepository = new NoticeMongoRepository();
    const notice = new Notice(
      new mongoose.Types.ObjectId()._id.toString(),
      "title",
      "url"
    );
    // WHEN
    await elMundoRepository.save(notice);
    const noticeOnRepo = await elMundoRepository.findOneBy({
      url: notice.getUrl(),
    });
    // THEN
    expect(noticeOnRepo).toEqual(notice);
  });
  it(`
  GIVEN I have 14 notices in repo, 7 from "ElPais" and 7 from "ElMundo"
  WHEN i get the repo
  THEN i get the 10 news
`, async () => {
    // GIVEN
    const noticeRepo = new NoticeMongoRepository();
    const elMundoNotices: Notice[] = createElMundoNotices(7);
    const elPaisNotices: Notice[] = createElPaisNotices(7);
    for (const elMundoNotice of elMundoNotices) {
      await noticeRepo.save(elMundoNotice);
    }
    for (const elPaisNotice of elPaisNotices) {
      await noticeRepo.save(elPaisNotice);
    }
    // WHEN
    const noticeOnRepo: Notice[] = await noticeRepo.get();
    // THEN
    const a = elMundoNotices.slice(0, 5);
    const b = elPaisNotices.slice(0, 5);
    expect(noticeOnRepo).toEqual([...a, ...b]);
  });
  it(`
  GIVEN I have 1 notice in repo
  WHEN i search by id
  THEN i get the notice
`, async () => {
    const elMundoRepository = new NoticeMongoRepository();
    const notice = new Notice(
      new mongoose.Types.ObjectId()._id.toString(),
      "title",
      "url"
    );
    // WHEN
    await elMundoRepository.save(notice);
    const noticeOnRepo = await elMundoRepository.getById(notice.getId());
    // THEN
    expect(noticeOnRepo).toEqual(notice);
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
