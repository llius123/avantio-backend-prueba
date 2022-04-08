import rp from "request-promise";

export class Test {
  constructor() {}
  public run() {
    const url =
      "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

    rp(url)
      .then(function (html) {
        //success!
        console.log(html);
      })
      .catch(function (err) {
        //handle error
      });
  }
}
