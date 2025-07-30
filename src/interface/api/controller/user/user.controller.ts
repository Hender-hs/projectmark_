import { Request, Response } from "express";
import { UserService } from "../../../../domain/user/service/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.json(user);
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  }
}