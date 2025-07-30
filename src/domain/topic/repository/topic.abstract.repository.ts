import { Topic } from "../model/topic.model";

export abstract class TopicRepository {
  abstract getAllTopics(): Promise<Topic[]>;
  abstract getTopicById(id: string, version: number): Promise<Topic | undefined>;
  abstract createTopic(topic: Topic): Promise<Topic>;
  abstract deleteTopic(id: string): Promise<void>;
}
