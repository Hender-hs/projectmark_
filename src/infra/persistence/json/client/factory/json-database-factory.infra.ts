import fs from "fs/promises";
import { JsonDatabaseSchema } from "../schema/schema.infra";

export class JsonDatabaseFactory {
  constructor() {}

  public async createJsonDatabase(): Promise<JsonDatabaseSchema> {
    try {
      const file = await fs.readFile(process.env.JSON_DATABASE_PATH!, "utf8");
      return JSON.parse(file) as JsonDatabaseSchema;
    } catch (error) {
      if (error instanceof Error && !error.message.includes("ENOENT")) {
        throw error;
      }
      const data: JsonDatabaseSchema = {
        users: [],
        topics: [],
        resources: [],
      };
      await fs.writeFile(process.env.JSON_DATABASE_PATH!, JSON.stringify(data, null, 4));
      return data as JsonDatabaseSchema;
    }
  }
}