import { Resource } from "../model/resource.model";

export abstract class ResourceRepository {
  abstract getResourceByTopicId(topicId: string): Promise<Resource>;
  abstract createResource(resource: Resource): Promise<Resource>;
  abstract updateResource(
    topicId: string,
    resource: Pick<Resource, "type" | "url" | "description">,
  ): Promise<Resource>;
  abstract deleteResource(topicId: string): Promise<void>;
}
