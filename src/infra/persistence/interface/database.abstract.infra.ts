import { DatabaseClient } from "./database-client.abstract.infra";

export abstract class Database {
  abstract getInstance(): DatabaseClient;
}
