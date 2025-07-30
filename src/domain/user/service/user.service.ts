import { User } from "../model/user.model";
import { UserRepository } from "../repository/user.abstract.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: User) {
    return this.userRepository.createUser(user);
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: string, user: User) {
    return this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}