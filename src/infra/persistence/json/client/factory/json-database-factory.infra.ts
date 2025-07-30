import fs from "fs/promises";
import { JsonDatabaseSchema } from "../schema/schema.infra";
import { UserRole } from "../../../../../domain/user/model/user.model";
import { v4 as uuidv4 } from "uuid";

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
      const rootUserId = "1";
      const rootTopicId = "root";
      const data: JsonDatabaseSchema = {
        users: [
          {
            id: rootUserId,
            name: "root",
            email: "root@example.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.ADMIN,
          },
        ],
        topics: [
          {
            id: rootTopicId,
            name: "root",
            content: "root",
            version: 0.1,
            parentTopicId: rootTopicId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        resources: [],
      };
      await fs.writeFile(
        process.env.JSON_DATABASE_PATH!,
        JSON.stringify(data, null, 4),
      );
      return data as JsonDatabaseSchema;
    }
  }
}
