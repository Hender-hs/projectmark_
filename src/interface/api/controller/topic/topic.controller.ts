import { Request, Response } from "express";
import { TopicService } from "../../../../domain/topic/service/topic.service";

export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  async getAllTopics(req: Request, res: Response) {
    const topics = await this.topicService.getAllTopics();
    res.json(topics);
  }

  async getTopicById(req: Request, res: Response) {
    const { id } = req.params;
    const topic = await this.topicService.getTopicById(id);
    res.json(topic);
  }

  async createTopic(req: Request, res: Response) {
    const topic = await this.topicService.createTopic(req.body);
    res.json(topic);
  }

  async updateTopic(req: Request, res: Response) {
    const { id } = req.params;
    const topic = await this.topicService.updateTopic(id, req.body);
    res.json(topic);
  }

  async deleteTopic(req: Request, res: Response) {
    const { id } = req.params;
    await this.topicService.deleteTopic(id);
    res.json({ message: "Topic deleted successfully" });
  }
}