import { WriteClient } from "../../../interface/write.abstract.infra";
import { JsonDatabaseSchema } from "../schema/schema.infra";
import _ from "lodash";

export class JsonWriteOperation implements WriteClient {
  constructor(private readonly database: JsonDatabaseSchema) {}

  async execute(query: string, params?: any[]): Promise<void> {
    _.set(this.database, query, params);
  }
}