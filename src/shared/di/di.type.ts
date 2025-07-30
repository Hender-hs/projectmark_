import { ResourceService } from "../../domain/resource/service/resource.service";
import { TopicService } from "../../domain/topic/service/topic.service";
import { UserService } from "../../domain/user/service/user.service";
import { TopicController } from "../../interface/api/controller/topic/topic.controller";
import { UserController } from "../../interface/api/controller/user/user.controller";
import { Logger } from "../logger/logger";
import { ResourceController } from "../../interface/api/controller/resource/resource.controller";
import { TopicRepository } from "../../domain/topic/repository/topic.abstract.repository";

export interface DiType {
  logger: Logger;
  userService: UserService;
  userController: UserController;
  topicRepository: TopicRepository;
  topicService: TopicService;
  topicController: TopicController;
  resourceService: ResourceService;
  resourceController: ResourceController;
}