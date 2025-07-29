import { TopicService } from "../../domain/topic/service/topic.service";
import { UserService } from "../../domain/user/service/user.service";
import { TopicRepositoryImpl } from "../../infra/persistence/json/repository/topic/topic.repository";
import { TopicController } from "../../interface/api/controller/topic/topic.controller";
import { UserController } from "../../interface/api/controller/user/user.controller";
import { DiType } from "./di.type";

export class Di {
  constructor() {}

  static getInstance(): DiType {
    const userService = new UserService();
    const userController = new UserController(userService);
    const topicRepository = new TopicRepositoryImpl();
    const topicService = new TopicService(topicRepository);
    const topicController = new TopicController(topicService);
    return {
        userService,
        userController,
        topicService,
        topicController,
    }
  }
}