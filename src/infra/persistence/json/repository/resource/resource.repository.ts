import { HttpCodes } from "../../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../../application/exception/http/http.exception";
import { Resource } from "../../../../../domain/resource/model/resource.model";
import { ResourceRepository } from "../../../../../domain/resource/repository/resource.abstract.repository";
import { DatabaseClient } from "../../../interface/database-client.abstract.infra";
import { v4 as uuidv4 } from "uuid";

export class ResourceRepositoryImpl implements ResourceRepository {
  constructor(private readonly database: DatabaseClient) {}

  async getResourceById(id: string): Promise<Resource> {
    const resources = await this.database.read().query<Resource>("resources");
    const resource = resources.find((resource) => resource.id === id);
    if (!resource) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Resource not found");
    }
    return resource;
  }

  async createResource(resource: Resource): Promise<Resource> {
    const insertResource = {
      ...resource,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.database.write().create("resources", [insertResource]);
    return insertResource;
  }

  async updateResource(
    id: string,
    resource: Pick<Resource, "type" | "url" | "description">,
  ): Promise<Resource> {
    const resources = await this.database.read().query<Resource>("resources");
    const index = resources.findIndex((resource) => resource.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Resource not found");
    }
    await this.database.write().update(`resources.${index}`, [
      {
        ...resource,
        updatedAt: new Date(),
      },
    ]);
    return resources[index];
  }

  async deleteResource(id: string): Promise<void> {
    const resources = await this.database.read().query<Resource>("resources");
    const index = resources.findIndex((resource) => resource.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Resource not found");
    }
    resources.splice(index, 1);
    await this.database.write().delete("resources", resources);
  }
}
