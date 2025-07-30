import { DatabaseClient } from "../../interface/database-client.abstract.infra";
import { ReadClient } from "../../interface/read.abstract.infra";
import { WriteClient } from "../../interface/write.abstract.infra";
import { JsonReadOperation } from "./read/read-op.infra";
import { JsonWriteOperation } from "./write/write-op.infra";

export class JsonDatabaseSingletonConn implements DatabaseClient {
  static instance: JsonDatabaseSingletonConn;

  private constructor() {}

  public static getInstance(): JsonDatabaseSingletonConn {
    if (!JsonDatabaseSingletonConn.instance) {
      JsonDatabaseSingletonConn.instance = new JsonDatabaseSingletonConn();
    }
    return JsonDatabaseSingletonConn.instance;
  }

  read(): ReadClient {
    return new JsonReadOperation();
  }

  write(): WriteClient {
    return new JsonWriteOperation();
  }
}