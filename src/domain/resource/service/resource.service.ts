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

  async getResourceByTopicId(topicId: string) {
    return this.resourceRepository.getResourceByTopicId(topicId);
  }

  async createResource(resource: Resource) {
    const topic = await this.topicRepository.getTopicById(resource.topicId, NaN);
    if (!topic) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Topic not found");
    }
    return this.resourceRepository.createResource(resource);
  }
}
