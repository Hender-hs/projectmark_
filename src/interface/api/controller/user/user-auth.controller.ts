import { Request, Response } from "express";
import { UserAuthService } from "../../../../domain/user/service/user-auth.service";

export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  async register(req: Request, res: Response) {
    const user = await this.userAuthService.register(req.body);
    res.json({
      ...(await this.userAuthService.login(user.email)),
    });
  }

  async login(req: Request, res: Response) {
    const { token, user } = await this.userAuthService.login(req.body.email);
    res.json({
      token,
      user,
    });
  }
}
