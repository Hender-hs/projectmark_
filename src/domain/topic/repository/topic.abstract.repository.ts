import { Topic } from "../model/topic.model";

export abstract class TopicRepository {
  abstract getAllTopics(): Promise<Topic[]>;
  abstract getTopicById(id: string): Promise<Topic>;
  abstract createTopic(topic: Topic): Promise<Topic>;
  abstract updateTopic(id: string, topic: Topic): Promise<Topic>;
  abstract deleteTopic(id: string): Promise<void>;
}