import { DeleteFeed } from "../../actions/DeleteFeed";
import { GetFeed } from "../../actions/GetFeed";
import { GetFeedById } from "../../actions/GetFeedById";
import { NoticeRepoMock } from "./NoticeRepoMock";

describe("DeleteFeed", () => {
  it(`
    WHEN i want to delete a specific feed
    THEN i delete it from repo
    `, async () => {
    // WHEN
    const repo = new NoticeRepoMock();
    const repoSpy = jest.spyOn(repo, "delete");
    const action = new DeleteFeed(repo);
    await action.run("FAKE_ID");

    // THEN
    expect(repoSpy).toBeCalled();
  });
});
