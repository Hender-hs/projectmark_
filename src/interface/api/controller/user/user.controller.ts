import { Request, Response } from "express";
import { UserService } from "../../../../domain/user/service/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }
}