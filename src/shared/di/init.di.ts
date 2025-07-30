import { TopicService } from "../../domain/topic/service/topic.service";
import { UserService } from "../../domain/user/service/user.service";
import { JsonDatabaseSingletonConn } from "../../infra/persistence/json/client/json-database-conn.infra";
import { TopicRepositoryImpl } from "../../infra/persistence/json/repository/topic/topic.repository";
import { TopicController } from "../../interface/api/controller/topic/topic.controller";
import { UserController } from "../../interface/api/controller/user/user.controller";
import { DiType } from "./di.type";
import { Logger } from "../logger/logger";
import { ResourceService } from "../../domain/resource/service/resource.service";
import { ResourceRepositoryImpl } from "../../infra/persistence/json/repository/resource/resource.repository";
import { ResourceController } from "../../interface/api/controller/resource/resource.controller";
import { UserRepositoryImpl } from "../../infra/persistence/json/repository/user/user.repository";

export class Di {
  static instance: DiType;

  constructor() {
  }

  init() {
    const databaseInstance = JsonDatabaseSingletonConn.getInstance();
    const logger = new Logger();
    const topicRepository = new TopicRepositoryImpl(databaseInstance);
    const resourceRepository = new ResourceRepositoryImpl(databaseInstance);
    const userRepository = new UserRepositoryImpl(databaseInstance);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    const topicService = new TopicService(topicRepository);
    const topicController = new TopicController(topicService);
    const resourceService = new ResourceService(resourceRepository, topicRepository);
    const resourceController = new ResourceController(resourceService);

    Di.instance = {
      logger,
      userService,
      userController,
      topicService,
      topicController,
      resourceService,
      resourceController,
    };

    logger.info("Di initialized");
  }

  static getInstance(): DiType {
    if (!Di.instance) {
      new Di().init();
    }
    return Di.instance;
  }
}