import { Request, Response } from "express";
import { UserService } from "../../../../domain/user/service/user.service";
import { HttpCodes } from "../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../application/exception/http/http.exception";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.json(user);
  }

  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    res.json(user);
  }
}
