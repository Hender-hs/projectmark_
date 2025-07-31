import { HttpCodes } from "../../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../../application/exception/http/http.exception";
import { User } from "../../../../../domain/user/model/user.model";
import { UserRepository } from "../../../../../domain/user/repository/user.abstract.repository";
import { DatabaseClient } from "../../../interface/database-client.abstract.infra";
import { v4 as uuidv4 } from "uuid";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly database: DatabaseClient) {}

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.database.read().query<User>("users");
    const user = users.find((user) => user.email === email);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const users = await this.database.read().query<User>("users");
    const user = users.find((user) => user.id === id);
    return user;
  }

  async createUser(user: User): Promise<User> {
    const insertUser = {
      ...user,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.database.write().create("users", [insertUser]);
    return insertUser as User;
  }

  async updateUser(id: string, user: User): Promise<User> {
    const users = await this.database.read().query<User>("users");
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    await this.database.write().update(`users.${index}`, [
      {
        ...user,
        updatedAt: new Date(),
      },
    ]);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const users = await this.database.read().query<User>("users");
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    await this.database.write().delete("users", index);
  }
}
