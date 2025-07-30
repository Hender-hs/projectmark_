import { Request, Response } from "express";
import { ResourceService } from "../../../../domain/resource/service/resource.service";

export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  async getResourceById(req: Request, res: Response) {
    const { id } = req.params;
    const resource = await this.resourceService.getResourceById(id);
    res.json(resource);
  }

  async createResource(req: Request, res: Response) {
    const resource = await this.resourceService.createResource(req.body);
    res.json(resource);
  }

  async updateResource(req: Request, res: Response) {
    const { id } = req.params;
    const resource = await this.resourceService.updateResource(id, req.body);
    res.json(resource);
  }

  async deleteResource(req: Request, res: Response) {
    const { id } = req.params;
    await this.resourceService.deleteResource(id);
    res.json({ message: "Resource deleted successfully" });
  }
}