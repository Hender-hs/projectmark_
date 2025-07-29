export abstract class WriteClient {
  constructor() {}

  abstract execute(query: string, params?: any[]): Promise<void>;
}