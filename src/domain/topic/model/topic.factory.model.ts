import { HttpException } from "../../../application/exception/http/http.exception";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";
import { Di } from "../../../shared/di/init.di";
import { TopicRepository } from "../repository/topic.abstract.repository";
import { Topic } from "./topic.model";

interface TopicFactory {
  increaseVersion(): this;
  save(): Promise<Topic>;
}

export class TopicFactoryModel implements TopicFactory {
  private readonly topicRepository: TopicRepository;
  private topic: Topic;
  private isToIncreaseVersion: boolean = false;

  constructor(topic: Topic) {
    this.topic = topic;
    this.topicRepository = Di.getInstance().topicRepository;
  }

  async save(): Promise<Topic> {
    let topic: Topic | undefined;
    if (this.topic.id) {
      topic = await this.topicRepository.getTopicById(this.topic.id, NaN);
      if (!topic) {
        throw new HttpException(HttpCodes.NOT_FOUND, "Topic not found");
      }
    }

    const parentTopic = await this.topicRepository.getTopicById(
      topic!.parentTopicId,
      NaN,
    );
    if (!parentTopic) {
      throw new HttpException(HttpCodes.NOT_FOUND, "Parent topic not found");
    }

    if (this.isToIncreaseVersion) {
      this._increaseVersion(topic!);
    }

    if (this.topic.id) {
      return this.topicRepository.createTopic({
        id: topic!.id,
        name: this.topic.name,
        content: this.topic.content,
        version: this.topic.version,
        parentTopicId: topic!.parentTopicId,
      } as Topic);
    }

    return this.topicRepository.createTopic(this.topic);
  }

  private _increaseVersion(topic: Topic) {
    let version: number;
    if (!topic.version) {
      version = 0.1;
    } else {
      const major = Math.floor(topic.version);
      const isLimitMinorVersion = (topic.version - major) >= 0.90;

      if (isLimitMinorVersion) {
        version = major + 1;
      } else {
        version = parseFloat((topic.version + 0.1).toFixed(1));
      }
    }

    this.topic = new Topic(
      topic.id,
      this.topic.name,
      this.topic.content,
      version,
      topic.parentTopicId,
      topic.createdAt,
      topic.updatedAt,
    );

    this.isToIncreaseVersion = false;
  }

  increaseVersion(): this {
    this.isToIncreaseVersion = true;
    return this;
  }
}
