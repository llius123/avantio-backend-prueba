import { GetFeed } from "../../actions/GetFeed";
import { GetFeedById } from "../../actions/GetFeedById";
import { NoticeRepoMock } from "./NoticeRepoMock";

describe("GetFeedById", () => {
  it(`
    WHEN i want to get specific feed
    THEN i received it from repo
    `, async () => {
    // WHEN
    const repo = new NoticeRepoMock();
    const repoSpy = jest.spyOn(repo, "getById");
    const action = new GetFeedById(repo);
    await action.run("FAKE_ID");

    // THEN
    expect(repoSpy).toBeCalled();
  });
});
