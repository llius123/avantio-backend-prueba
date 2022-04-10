import { IdGenerator } from "../../src/utils/IdGenerator";

export class IdGeneratorMock implements IdGenerator {
  constructor() {}
  run(): string {
    return "";
  }
}
