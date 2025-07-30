import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { RouteBuilder } from "../utils/builder/route-builder";

const router = Router();
const { resourceController, logger } = Di.getInstance();

const ROUTE_GROUP = "/api/v1";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /resource`);

routeBuilder.setRoute({
  path: "/resource/:id",
  method: "get",
  handler: resourceController.getResourceById.bind(resourceController),
}).setRouter(router).build();

routeBuilder.setRoute({
  path: "/resource",
  method: "post",
  handler: resourceController.createResource.bind(resourceController),
  bodyValidation: ValidatorDto.middleware(["name", "content", "version", "parentTopicId"]),
}).setRouter(router).build();

routeBuilder.setRoute({
  path: "/resource/:id",
  method: "put",
  handler: resourceController.updateResource.bind(resourceController),
  bodyValidation: ValidatorDto.middleware(["name", "content", "version", "parentTopicId"]),
}).setRouter(router).build();

routeBuilder.setRoute({
  path: "/resource/:id",
  method: "delete",
  handler: resourceController.deleteResource.bind(resourceController),
  bodyValidation: ValidatorDto.middleware(["id", "name", "content", "version", "parentTopicId"]),
}).setRouter(router).build();

routeBuilder.setRoute({
  path: "/resource/:id",
  method: "delete",
  handler: resourceController.deleteResource.bind(resourceController),
}).setRouter(router).build();

logger.info(``);

export { router };