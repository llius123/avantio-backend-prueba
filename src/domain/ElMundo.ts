export class ElMundo {
  private id: string;
  private title: string;
  private url: string;

  constructor(id: string, title: string, url: string) {
    this.id = id;
    this.title = title;
    this.url = url;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getUrl(): string {
    return this.url;
  }
}
