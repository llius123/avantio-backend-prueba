import { GetFeed } from "../../actions/GetFeed";
import { NoticeRepoMock } from "./NoticeRepoMock";

describe("GetFeed", () => {
  it(`
    WHEN i want to get feed
    THEN i received from repo
    `, async () => {
    // WHEN
    const repo = new NoticeRepoMock();
    const repoSpy = jest.spyOn(repo, "get");
    const action = new GetFeed(repo);
    await action.run();

    // THEN
    expect(repoSpy).toBeCalled();
  });
});
