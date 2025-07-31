import { Request, Response } from "express";
import { ResourceService } from "../../../../domain/resource/service/resource.service";

export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  async getResourceByTopicId(req: Request, res: Response) {
    const { topicId } = req.params;
    const resource = await this.resourceService.getResourceByTopicId(topicId);
    res.json(resource);
  }

  async createResource(req: Request, res: Response) {
    const resource = await this.resourceService.createResource(req.body);
    res.json(resource);
  }
}
