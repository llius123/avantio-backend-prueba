import { ElPaisScrapper } from "../../actions/ElPaisScrapper";
import { Notice } from "../../domain/Notice";
import { IdGeneratorMock } from "./IdGeneratorMock";
import { NoticeRepoMock } from "./NoticeRepoMock";
import { ScraperMock } from "./ScraperMock";

describe("ElPaisScraper", () => {
  it(`
    GIVEN I want to scrape "ElPais"
    WHEN i scrape the webpage
    THEN i save the notices on repo
    `, async () => {
    // GIVEN
    const idGenerator = new IdGeneratorMock();
    jest.spyOn(idGenerator, "run").mockImplementation(() => {
      return "62529656d717a077bec16624";
    });
    const elPaisRepoMock = new NoticeRepoMock();
    const elPaisRepoMockSpy = jest.spyOn(elPaisRepoMock, "save");
    const scraperMock = new ScraperMock();
    jest.spyOn(scraperMock, "run").mockImplementation(async () => {
      return [
        {
          title:
            "De Jong marca en los últimos minutos para el Barça ante el Levante (2-3)",
          url: "/deportes/2022-04-09/levante-barcelona-en-directo-la-liga-santander-en-vivo.html",
        },
      ];
    });
    jest.useFakeTimers().setSystemTime(new Date("2022-04-09"));
    const action = new ElPaisScrapper(elPaisRepoMock, scraperMock, idGenerator);
    // WHEN
    await action.run();
    // THEN
    expect(elPaisRepoMockSpy).toBeCalledWith(
      new Notice(
        "62529656d717a077bec16624",
        "De Jong marca en los últimos minutos para el Barça ante el Levante (2-3)",
        "https://www.elpais.es/deportes/2022-04-09/levante-barcelona-en-directo-la-liga-santander-en-vivo.html"
      )
    );
  });
});
