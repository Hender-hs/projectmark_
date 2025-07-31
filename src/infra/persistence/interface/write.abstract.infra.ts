export abstract class WriteClient {
  constructor() {}

  abstract create<T>(query: string, params: T[]): Promise<void>;
  abstract update<T>(query: string, params: T[]): Promise<void>;
  abstract delete(query: string, indexToDelete: number): Promise<void>;
}
