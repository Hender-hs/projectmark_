import { ReadClient } from "./read.abstract.infra";
import { WriteClient } from "./write.abstract.infra";

export abstract class DatabaseClient {
  abstract read(): ReadClient;
  abstract write(): WriteClient;
}
