import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { RouteBuilder } from "../utils/builder/route.builder";
import { RoutePermissions } from "../utils/permissions/route.permissions";
import { z } from "zod";

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
  .setPermissions([RoutePermissions.VIEW])
  .build();

routeBuilder
  .setRoute({
    path: "/shortest-path",
    method: "get",
    handler: topicController.getShortestPath.bind(topicController),
  })
  .setRouter(router)
  .setPermissions([RoutePermissions.VIEW])
  .build();

routeBuilder
  .setRoute({
    path: "/:id",
    method: "get",
    handler: topicController.getTopicById.bind(topicController),
  })
  .setRouter(router)
  .setPermissions([RoutePermissions.VIEW])
  .build();

routeBuilder
.setRoute({
  path: "/:id",
  method: "put",
  handler: topicController.updateTopic.bind(topicController),
  bodyValidation: ValidatorDto.middleware(z.object({
    name: z.string().optional(),
    content: z.string().optional(),
  })),
})
.setRouter(router)
.setPermissions([RoutePermissions.EDIT])
.build();

routeBuilder
.setRoute({
  path: "/:id",
  method: "delete",
  handler: topicController.deleteTopic.bind(topicController),
})
.setRouter(router)
.setPermissions([RoutePermissions.DELETE])
.build();

routeBuilder
  .setRoute({
    path: "/",
    method: "post",
    handler: topicController.createTopic.bind(topicController),
    bodyValidation: ValidatorDto.middleware(z.object({
      name: z.string(),
      content: z.string(),
      parentTopicId: z.string(),
    })),
  })
  .setRouter(router)
  .setPermissions([RoutePermissions.CREATE])
  .build();

routeBuilder
  .setRoute({
    path: "/",
    method: "get",
    handler: topicController.getAllTopics.bind(topicController),
  })
  .setRouter(router)
  .setPermissions([RoutePermissions.VIEW])
  .build();


logger.info(``);

export { router };
