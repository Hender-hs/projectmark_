import { User } from "../model/user.model";

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<User>;
  abstract createUser(user: User): Promise<User>;
  abstract updateUser(id: string, user: User): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
}