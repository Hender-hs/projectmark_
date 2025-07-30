import { ResourceService } from "../../domain/resource/service/resource.service";
import { TopicService } from "../../domain/topic/service/topic.service";
import { UserService } from "../../domain/user/service/user.service";
import { TopicController } from "../../interface/api/controller/topic/topic.controller";
import { UserController } from "../../interface/api/controller/user/user.controller";
import { Logger } from "../logger/logger";
import { ResourceController } from "../../interface/api/controller/resource/resource.controller";

export interface DiType {
  logger: Logger;
  userService: UserService;
  userController: UserController;
  topicService: TopicService;
  topicController: TopicController;
  resourceService: ResourceService;
  resourceController: ResourceController;
}