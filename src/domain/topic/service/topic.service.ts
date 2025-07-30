import { Topic } from "../model/topic.model";
import { TopicRepository } from "../repository/topic.abstract.repository";
import { TopicFactoryModel } from "../model/topic.factory.model";

export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async getAllTopics() {
    return this.topicRepository.getAllTopics();
  }

  async getTopicById(id: string) {
    return this.topicRepository.getTopicById(id);
  }

  async createTopic(topic: Topic) {
    const topicFactory = new TopicFactoryModel(topic);
    return topicFactory.save();
  }

  async updateTopic(topic: Topic) {
    const topicFactory = new TopicFactoryModel(topic);
    return topicFactory.increaseVersion().save();
  }

  async deleteTopic(id: string) {
    return this.topicRepository.deleteTopic(id);
  }
}
