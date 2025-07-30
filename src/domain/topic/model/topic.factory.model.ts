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

    constructor(topic: Topic) {
        this.topic = topic;
        this.topicRepository = Di.getInstance().topicRepository;
    }

    async save(): Promise<Topic> {
        const parentTopic = await this.topicRepository.getTopicById(this.topic.parentTopicId);
        if (!parentTopic) {
            throw new HttpException(HttpCodes.NOT_FOUND, "Parent topic not found");
        }
        if (this.topic.id) {
            const topic = await this.topicRepository.getTopicById(this.topic.id);
            if (!topic) {
                throw new HttpException(HttpCodes.NOT_FOUND, "Topic not found");
            }
            return this.topicRepository.updateTopic(this.topic.id, this.topic);
        }
        return this.topicRepository.createTopic(this.topic);
    }

    increaseVersion(): this {
        let version: number;
        if (!this.topic.version) {
            version = 0.1;
        } else {
            const major = Math.floor(this.topic.version);
            const minor = Math.round((this.topic.version - major) * 10);
            
            if (minor < 9) {
                version = major + (minor + 1) * 0.1;
            } else {
                version = (major + 1) + 0.0;
            }
        }
        
        this.topic = new Topic(this.topic.id, this.topic.name, this.topic.content, version, this.topic.parentTopicId, this.topic.createdAt, this.topic.updatedAt);
        return this;
    }
}