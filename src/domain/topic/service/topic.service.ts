import { Topic } from "../model/topic.model";
import { TopicRepository } from "../repository/topic.abstract.repository";
import { TopicFactoryModel } from "../model/topic.factory.model";
import { HttpException } from "../../../application/exception/http/http.exception";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";
import { TopicComponent, TopicComposite } from "../model/topic.composite.model";
import { isAccessor } from "typescript";

export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async getAllTopics() {
    return this.topicRepository.getAllTopics();
  }

  async getTopicById(id: string, version: number = NaN) {
    return this.topicRepository.getTopicById(id, version);
  }

  async createTopic(topic: Topic) {
    const topicFactory = new TopicFactoryModel(topic);
    return topicFactory.save();
  }

  async updateTopic(id: string, topic: Topic) {
    const topicFactory = new TopicFactoryModel({ ...topic, id });
    return topicFactory.increaseVersion().save();
  }

  async deleteTopic(id: string) {
    return this.topicRepository.deleteTopic(id);
  }

  async getTopicHierarchyTree(id: string = "root"): Promise<TopicComposite> {
    const topics = await this.topicRepository.getAllTopics();

    const compositeTopics = topics
      .reduce((acc, curr) => {
        acc[curr.id] = new TopicComposite(curr);
        return acc;
      }, {} as Record<string, TopicComposite>);

    topics.forEach((topic) => {
      if (topic.id === "root") {
        return;
      }
      const parentTopic = compositeTopics[topic.parentTopicId];
      if (parentTopic) {
        parentTopic.add(compositeTopics[topic.id]);
      }
    });

    return compositeTopics[id];
  }

  async getJsonTopicHierarchyTree(id: string = "root"): Promise<string> {
    const topicHierarchyTree = await this.getTopicHierarchyTree(id);
    return JSON.stringify(topicHierarchyTree, null, 4);
  }
}
