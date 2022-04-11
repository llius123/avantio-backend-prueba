import { CreateFeed } from "../../actions/CreateFeed";
import { DeleteFeed } from "../../actions/DeleteFeed";
import { GetFeed } from "../../actions/GetFeed";
import { GetFeedById } from "../../actions/GetFeedById";
import { Notice } from "../../domain/Notice";
import { IdGeneratorMongoose } from "../../utils/IdGeneratorMongoose";
import { NoticeRepoMock } from "./NoticeRepoMock";
const idGenerator = new IdGeneratorMongoose();
describe("DeleteFeed", () => {
  it(`
    WHEN i create a feed
    THEN the feed is saved in repo
    `, async () => {
    // WHEN
    const repo = new NoticeRepoMock();
    const repoSpy = jest.spyOn(repo, "create");
    const notice = { id: idGenerator.run(), title: "Title", url: "url" };
    const action = new CreateFeed(repo);
    await action.run(notice);

    // THEN
    expect(repoSpy).toBeCalled();
  });
});
