export interface Scraper {
  run: (url: string, htmlTagToScrap: string) => Promise<any>;
}
