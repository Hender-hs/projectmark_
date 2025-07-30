import { Resource } from "../model/resource.model";

export abstract class ResourceRepository {
  abstract getResourceById(id: string): Promise<Resource>;
  abstract createResource(resource: Resource): Promise<Resource>;
  abstract updateResource(
    id: string,
    resource: Pick<Resource, "type" | "url" | "description">,
  ): Promise<Resource>;
  abstract deleteResource(id: string): Promise<void>;
}
