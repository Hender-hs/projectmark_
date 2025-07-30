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

  async getShortestPath(startId: string, endId: string): Promise<Topic[]> {
    const topics = await this.topicRepository.getAllTopics();
    const pathT1: string[] = [];
    const pathT2: string[] = [];

    let tp1 = topics.find((topic) => topic.id === startId);
    if (!tp1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Start topic not found");
    }

    let tp2 = topics.find((topic) => topic.id === endId);
    if (!tp2) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Target topic not found");
    }

    while (!pathT1.includes("root") || !pathT2.includes("root")) {
      if (!pathT1.includes('root')) {
        pathT1.push(tp1!.id);
        tp1 = topics.find((topic) => tp1!.parentTopicId === topic.id);
      }
      if (!pathT2.includes('root')) {
        pathT2.unshift(tp2!.id);
        tp2 = topics.find((topic) => tp2!.parentTopicId === topic.id);
      }
    }

    let path: string[] = [];
    for (let idx = 0; idx < pathT1.length; idx++) {
      const id = pathT1[idx];
      if (pathT2.includes(id)) {
        path = [...pathT1.slice(0, idx + 1), ...pathT2.slice(pathT2.indexOf(id) + 1)];
        break;
      }
    }

    return path.map((id) => topics.find((topic) => topic.id === id)!);
  }
}
