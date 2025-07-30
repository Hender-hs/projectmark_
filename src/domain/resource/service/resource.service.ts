import { Resource } from "../model/resource.model";
import { ResourceRepository } from "../repository/resource.abstract.repository";
import { TopicRepository } from "../../topic/repository/topic.abstract.repository";
import { HttpException } from "../../../application/exception/http/http.exception";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";

export class ResourceService {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private readonly topicRepository: TopicRepository,
  ) {}

  async getResourceById(id: string) {
    return this.resourceRepository.getResourceById(id);
  }

  async createResource(resource: Resource) {
    const topic = await this.topicRepository.getTopicById(resource.topicId, NaN);
    if (!topic) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Topic not found");
    }
    return this.resourceRepository.createResource(resource);
  }

  async updateResource(id: string, resource: Resource) {
    return this.resourceRepository.updateResource(id, {
      type: resource.type,
      url: resource.url,
      description: resource.description,
    });
  }

  async deleteResource(id: string) {
    return this.resourceRepository.deleteResource(id);
  }
}
