export interface Scraper {
  run: (
    url: string,
    htmlTagToScrap: string,
    encoding: "utf8" | "latin1"
  ) => Promise<any>;
}
