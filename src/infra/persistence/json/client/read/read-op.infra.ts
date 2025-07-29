import { ReadClient } from "../../../interface/read.abstract.infra";
import { JsonDatabaseSchema } from "../schema/schema.infra";
import _ from "lodash";

export class JsonReadOperation implements ReadClient {
  constructor(private readonly database: JsonDatabaseSchema) {}

  async query<T>(query: string): Promise<T[]> {
    const result = _.get(this.database, query, []);
    return result as T[];
  }
}