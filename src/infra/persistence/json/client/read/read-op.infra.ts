import { ReadClient } from "../../../interface/read.abstract.infra";
import _ from "lodash";
import { JsonDatabaseFactory } from "../factory/json-database-factory.infra";

export class JsonReadOperation implements ReadClient {
  async query<T>(query: string): Promise<T[]> {
    const database = await new JsonDatabaseFactory().createJsonDatabase();
    const result = _.get(database, query, []);
    return result as T[];
  }
}