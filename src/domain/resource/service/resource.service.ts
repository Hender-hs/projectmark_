import { Resource } from "../model/resource.model";
import { ResourceRepository } from "../repository/resource.abstract.repository";
import { TopicRepository } from "../../topic/repository/topic.abstract.repository";

export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepository, private readonly topicRepository: TopicRepository) {}

  async getResourceById(id: string) {
    return this.resourceRepository.getResourceById(id);
  }

  async createResource(resource: Resource) {
    const topic = await this.topicRepository.getTopicById(resource.topicId);
    if (!topic) {
      throw new Error("Topic not found");
    }
    return this.resourceRepository.createResource(resource);
  }

  async updateResource(id: string, resource: Resource) {
    return this.resourceRepository.updateResource(id, resource);
  }

  async deleteResource(id: string) {
    return this.resourceRepository.deleteResource(id);
  }
}