import { Topic } from "../../../../../domain/topic/model/topic.model";
import { TopicRepository } from "../../../../../domain/topic/repository/topic.abstract.repository";
import { JsonDatabaseSingletonConn } from "../../client/json-database-conn.infra";

export class TopicRepositoryImpl implements TopicRepository {
  private database: JsonDatabaseSingletonConn;

  constructor() {
    this.database = JsonDatabaseSingletonConn.getInstance();
  }

  async getAllTopics(): Promise<Topic[]> {
    return this.database.read().query("topics");
  }

  async getTopicById(id: string): Promise<Topic> {
    const topics = await this.database.read().query<Topic>("topics");
    const topic = topics.find((topic) => topic.id === id);
    if (!topic) {
      throw new Error("Topic not found");
    }
    return topic;
  }

  async createTopic(topic: Topic): Promise<Topic> {
    await this.database.write().execute("topics", [topic]);
    return topic;
  }

  async updateTopic(id: string, topic: Topic): Promise<Topic> {
    const topics = await this.database.read().query<Topic>("topics");
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new Error("Topic not found");
    }
    topics[index] = topic;
    await this.database.write().execute("topics", topics);
    return topic;
  }

  async deleteTopic(id: string): Promise<void> {
    const topics = await this.database.read().query<Topic>("topics");
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new Error("Topic not found");
    }
    topics.splice(index, 1);
    await this.database.write().execute("topics", topics);
  }
}