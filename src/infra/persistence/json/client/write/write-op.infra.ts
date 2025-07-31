import { WriteClient } from "../../../interface/write.abstract.infra";
import { JsonDatabaseFactory } from "../factory/json-database-factory.infra";
import _ from "lodash";
import fs from "fs/promises";
import { JsonDatabaseSchema } from "../schema/schema.infra";

export class JsonWriteOperation implements WriteClient {
  private async write(database: JsonDatabaseSchema): Promise<void> {
    await fs.writeFile(
      process.env.JSON_DATABASE_PATH!,
      JSON.stringify(database, null, 4),
    );
  }

  async create<T>(query: string, params: T[]): Promise<void> {
    const database = await new JsonDatabaseFactory().createJsonDatabase();
    const queryData = database[query as keyof JsonDatabaseSchema];
    _.set(database, query, [...queryData, ...params]);
    await this.write(database);
  }

  async update<T>(query: string, params: T[]): Promise<void> {
    const database = await new JsonDatabaseFactory().createJsonDatabase();
    const queryData = database[query as keyof JsonDatabaseSchema];
    _.set(database, query, [...queryData, ...params]);
    await this.write(database);
  }

  async delete(query: string, indexToDelete: number): Promise<void> {
    const database = await new JsonDatabaseFactory().createJsonDatabase();
    const queryData = database[query as keyof JsonDatabaseSchema];
    queryData.splice(indexToDelete, 1);
    _.set(database, query, queryData);
    await this.write(database);
  }
}
