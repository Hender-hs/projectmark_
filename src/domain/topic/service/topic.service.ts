import { Topic } from "../model/topic.model";
import { TopicRepository } from "../repository/topic.abstract.repository";

export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async getAllTopics() {
    return this.topicRepository.getAllTopics();
  }

  async getTopicById(id: string) {
    return this.topicRepository.getTopicById(id);
  }

  async createTopic(topic: Topic) {
    return this.topicRepository.createTopic(topic);
  }

  async updateTopic(id: string, topic: Topic) {
    return this.topicRepository.updateTopic(id, topic);
  }

  async deleteTopic(id: string) {
    return this.topicRepository.deleteTopic(id);
  }
}