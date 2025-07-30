import { UserRepository } from "../repository/user.abstract.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    // return this.userRepository.getAllUsers();
  }
}