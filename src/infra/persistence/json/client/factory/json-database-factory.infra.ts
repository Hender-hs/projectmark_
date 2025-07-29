import fs from "fs/promises";
import { JsonDatabaseSchema } from "../schema/schema.infra";

export class JsonDatabaseFactory {
  constructor() {}

  private async createJsonDatabase(): Promise<JsonDatabaseSchema> {
    const file = await fs.readFile(process.env.JSON_DATABASE_PATH!, "utf8");
    return JSON.parse(file) as JsonDatabaseSchema;
  }
}