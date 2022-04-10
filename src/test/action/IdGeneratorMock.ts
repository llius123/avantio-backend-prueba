import { IdGenerator } from "../../utils/IdGenerator";

export class IdGeneratorMock implements IdGenerator {
  constructor() {}
  run(): string {
    return "";
  }
}
