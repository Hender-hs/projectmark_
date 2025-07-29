export abstract class ReadClient {
  constructor() {}

  abstract query<T>(query: string, params?: any[]): Promise<T[]>;
}