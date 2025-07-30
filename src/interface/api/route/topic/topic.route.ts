import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { RouteBuilder } from "../utils/builder/route-builder";

const router = Router();
const { topicController, logger } = Di.getInstance();

const ROUTE_GROUP = "/topic";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /topic`);


routeBuilder
  .setRoute({
    path: "/hierarchy",
    method: "get",
    handler: topicController.getTopicHierarchyTree.bind(topicController),
  })
  .setRouter(router)
  .build();

routeBuilder
  .setRoute({
    path: "/:id",
    method: "get",
    handler: topicController.getTopicById.bind(topicController),
  })
  .setRouter(router)
  .build();

  
routeBuilder
.setRoute({
  path: "/:id",
  method: "put",
  handler: topicController.updateTopic.bind(topicController),
  bodyValidation: ValidatorDto.middleware([
    "name",
    "content",
  ]),
})
.setRouter(router)
.build();

routeBuilder
.setRoute({
  path: "/:id",
  method: "delete",
  handler: topicController.deleteTopic.bind(topicController),
})
.setRouter(router)
.build();

routeBuilder
  .setRoute({
    path: "/",
    method: "post",
    handler: topicController.createTopic.bind(topicController),
    bodyValidation: ValidatorDto.middleware([
      "name",
      "content",
      "version",
      "parentTopicId",
    ]),
  })
  .setRouter(router)
  .build();

routeBuilder
  .setRoute({
    path: "/",
    method: "get",
    handler: topicController.getAllTopics.bind(topicController),
  })
  .setRouter(router)
  .build();


logger.info(``);

export { router };
