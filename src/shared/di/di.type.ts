import { TopicService } from "../../domain/topic/service/topic.service";
import { UserService } from "../../domain/user/service/user.service";
import { TopicController } from "../../interface/api/controller/topic/topic.controller";
import { UserController } from "../../interface/api/controller/user/user.controller";

export interface DiType {
  userService: UserService;
  userController: UserController;
  topicService: TopicService;
  topicController: TopicController;
}