import { HttpCodes } from "../../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../../application/exception/http/http.exception";
import { Topic } from "../../../../../domain/topic/model/topic.model";
import { TopicRepository } from "../../../../../domain/topic/repository/topic.abstract.repository";
import { DatabaseClient } from "../../../interface/database-client.abstract.infra";
import { v4 as uuidv4 } from "uuid";

export class TopicRepositoryImpl implements TopicRepository {
  constructor(private readonly database: DatabaseClient) {}

  async getAllTopics(): Promise<Topic[]> {
    const allTopics = await this.database.read().query("topics") as Topic[];
    const allUniqueTopicsWithLatestVersion = Object.values(allTopics.reduce((acc, curr) => {
      if (acc[curr.id]) {
        if (acc[curr.id].version < curr.version) {
          acc[curr.id] = curr;
        }
      } else {
        acc[curr.id] = curr;
      }
      return acc;
    }, {} as Record<string, Topic>))
      .sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    return allUniqueTopicsWithLatestVersion;
  }

  async getTopicVersionsById(id: string): Promise<Topic[]> {
    const topics = await this.database.read().query<Topic>("topics");
    return topics.filter((topic) => topic.id === id).sort(
      (a, b) => b.version - a.version
    );
  }

  async getTopicById(id: string, version: number = -1): Promise<Topic | undefined> {
    const topics = await this.database.read().query<Topic>("topics");
    const targetTopics = topics.filter((topic) => topic.id === id);
    if (!version || 0 > version) {
      return targetTopics.sort(
        (a, b) => b.version - a.version
      )[0];
    }
    
    const exactMatch = targetTopics.find((topic) => topic.version === version);
    if (exactMatch) {
      return exactMatch;
    }
    
    if (targetTopics.length > 0) {
      const closestTopic = targetTopics.reduce((closest, current) => {
        const closestDiff = Math.abs(closest.version - version);
        const currentDiff = Math.abs(current.version - version);
        return currentDiff < closestDiff ? current : closest;
      });
      return closestTopic;
    }
    
    return undefined;
  }

  async createTopic(topic: Topic): Promise<Topic> {
    const insertTopic = {
      ...topic,
      id: topic.id || uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.database.write().create("topics", [insertTopic]);
    return insertTopic;
  }

  async deleteTopic(id: string): Promise<void> {
    const topics = await this.database.read().query<Topic>("topics");
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new HttpException(
        HttpCodes.NOT_FOUND,
        "Topic for delete not found",
      );
    }
    await this.database.write().delete("topics", index);
  }
}
