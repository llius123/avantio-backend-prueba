import { ElMundoRepoMock } from "./ElMundoRepoMock";
import { ElMundoScrapper } from "../../src/actions/ElMundoScrapper";
import { ScraperMock } from "./ScraperMock";
import { Notice } from "../../src/domain/Notice";
import { IdGeneratorMock } from "./IdGeneratorMock";

describe("ElMundoScraper", () => {
  it(`
  GIVEN i want to scrape el mundo
        WHEN i scrape El mundo
        THEN i should get one link
    `, async () => {
    // WHEN
    const idGenerator = new IdGeneratorMock();
    jest.spyOn(idGenerator, "run").mockImplementation(() => {
      return "62529656d717a077bec16624";
    });

    const elMundoRepoMock = new ElMundoRepoMock();
    const elMundoRepoMockSpy = jest.spyOn(elMundoRepoMock, "save");

    const scraperMock = new ScraperMock();
    jest.spyOn(scraperMock, "run").mockImplementation(async () => {
      return [
        {
          attribs: {
            href: "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html",
          },
          children: [
            {
              children: [
                {
                  data: 'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
                },
              ],
            },
          ],
        },
      ];
    });
    jest.useFakeTimers().setSystemTime(new Date("2022-04-09"));
    const action = new ElMundoScrapper(
      elMundoRepoMock,
      scraperMock,
      idGenerator
    );
    await action.run();

    expect(elMundoRepoMockSpy).toBeCalledWith(
      new Notice(
        "62529656d717a077bec16624",
        'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
        "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html"
      )
    );
  });
  it(`
  GIVEN i want to scrape el mundo
    WHEN i scrappe el mundo and the new title is not valid
    THEN that new is not saved
  `, async () => {
    // WHEN
    const idGenerator = new IdGeneratorMock();
    jest.spyOn(idGenerator, "run").mockImplementation(() => {
      return "62529656d717a077bec16624";
    });

    const elMundoRepoMock = new ElMundoRepoMock();
    const elMundoRepoMockSpy = jest.spyOn(elMundoRepoMock, "save");

    const scraperMock = new ScraperMock();
    jest.spyOn(scraperMock, "run").mockImplementation(async () => {
      return [
        {
          attribs: {
            href: "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html",
          },
          children: [
            {
              children: [
                {
                  data: "1",
                },
              ],
            },
          ],
        },
      ];
    });
    jest.useFakeTimers().setSystemTime(new Date("2022-04-09"));
    const action = new ElMundoScrapper(
      elMundoRepoMock,
      scraperMock,
      idGenerator
    );
    await action.run();

    expect(elMundoRepoMockSpy).not.toBeCalled();
  });

  it(`
  GIVEN i want to scrape el mundo
  WHEN i scrappe el mundo and the new is duplicated
  THEN that new is not saved
`, async () => {
    // WHEN
    const idGenerator = new IdGeneratorMock();
    jest.spyOn(idGenerator, "run").mockImplementation(() => {
      return "62529656d717a077bec16624";
    });

    const elMundoRepoMock = new ElMundoRepoMock();
    const elMundoRepoMockSpy = jest.spyOn(elMundoRepoMock, "save");

    const scraperMock = new ScraperMock();
    jest.spyOn(scraperMock, "run").mockImplementation(async () => {
      return [
        {
          attribs: {
            href: "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html",
          },
          children: [
            {
              children: [
                {
                  data: 'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
                },
              ],
            },
          ],
        },
        {
          attribs: {
            href: "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html",
          },
          children: [
            {
              children: [
                {
                  data: 'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
                },
              ],
            },
          ],
        },
      ];
    });
    jest.useFakeTimers().setSystemTime(new Date("2022-04-09"));
    const action = new ElMundoScrapper(
      elMundoRepoMock,
      scraperMock,
      idGenerator
    );
    await action.run();

    expect(elMundoRepoMockSpy).toBeCalledWith(
      new Notice(
        "62529656d717a077bec16624",
        'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
        "https://www.elmundo.es/internacional/2022/04/09/6251c2a9e4d4d843778b459d.html"
      )
    );
  });
  it(`
        GIVEN i want to scrape el mundo
        WHEN i scrape El mundo with specfic date
        THEN i should save news from the specfic date
    `, async () => {
    // WHEN
    const idGenerator = new IdGeneratorMock();
    jest.spyOn(idGenerator, "run").mockImplementation(() => {
      return "62529656d717a077bec16624";
    });

    const elMundoRepoMock = new ElMundoRepoMock();
    const elMundoRepoMockSpy = jest.spyOn(elMundoRepoMock, "save");

    const scraperMock = new ScraperMock();
    jest.spyOn(scraperMock, "run").mockImplementation(async () => {
      return [
        {
          attribs: {
            href: "https://www.elmundo.es/internacional/2011/01/01/6251c2a9e4d4d843778b459d.html",
          },
          children: [
            {
              children: [
                {
                  data: 'La guerra rompe los lazos prorrusos en el este de Ucrania: "No creo que nunca les perdonemos, es imposible"',
                },
              ],
            },
          ],
        },
      ];
    });
    jest.useFakeTimers().setSystemTime(new Date("2022-04-09"));
    const action = new ElMundoScrapper(
      elMundoRepoMock,
      scraperMock,
      idGenerator
    );
    await action.run();

    expect(elMundoRepoMockSpy).not.toBeCalled();
  });
});
