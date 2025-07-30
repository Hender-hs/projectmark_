import { HttpCodes } from "../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../application/exception/http/http.exception";
import { Jwt } from "../../../shared/jwt/jwt";
import { User } from "../model/user.model";
import { UserRepository } from "../repository/user.abstract.repository";

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserById(email);
    if (!user) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    return user;
  }

  async register(user: User) {
    return this.userRepository.createUser(user);
  }

  async generateToken(user: User) {
    return Jwt.sign({ id: user.id, email: user.email, role: user.role });
  }

  async authenticateToken(token: string) {
    return Jwt.verify(token);
  }
}
