import { HttpCodes } from "../../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../../application/exception/http/http.exception";
import { Topic } from "../../../../../domain/topic/model/topic.model";
import { TopicRepository } from "../../../../../domain/topic/repository/topic.abstract.repository";
import { DatabaseClient } from "../../../interface/database-client.abstract.infra";
import { v4 as uuidv4 } from "uuid";

export class TopicRepositoryImpl implements TopicRepository {
  constructor(private readonly database: DatabaseClient) {}

  async getAllTopics(): Promise<Topic[]> {
    return this.database.read().query("topics");
  }

  async getTopicById(id: string): Promise<Topic | undefined> {
    const topics = await this.database.read().query<Topic>("topics");
    const topic = topics.find((topic) => topic.id === id);
    return topic;
  }

  async createTopic(topic: Topic): Promise<Topic> {
    const insertTopic = {
      ...topic,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.database.write().create("topics", [insertTopic]);
    return insertTopic;
  }

  async updateTopic(id: string, topic: Topic): Promise<Topic> {
    const topics = await this.database.read().query<Topic>("topics");
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Topic for update not found");
    }
    await this.database.write().update(`topics.${index}`, [{
      content: topic.content,
      name: topic.name,
      version: topic.version,
      updatedAt: new Date(),
    }]);
    return topic;
  }

  async deleteTopic(id: string): Promise<void> {
    const topics = await this.database.read().query<Topic>("topics");
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Topic for delete not found");
    }
    topics.splice(index, 1);
    await this.database.write().delete("topics", topics);
  }
}