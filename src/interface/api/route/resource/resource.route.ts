import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { RouteBuilder } from "../utils/builder/route-builder";

const router = Router();
const { resourceController, logger } = Di.getInstance();

const ROUTE_GROUP = "/resource";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /resource`);

routeBuilder
  .setRoute({
    path: "/:id",
    method: "get",
    handler: resourceController.getResourceById.bind(resourceController),
  })
  .setRouter(router)
  .build();

routeBuilder
  .setRoute({
    path: "/",
    method: "post",
    handler: resourceController.createResource.bind(resourceController),
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
    path: "/:id",
    method: "put",
    handler: resourceController.updateResource.bind(resourceController),
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
    path: "/:id",
    method: "delete",
    handler: resourceController.deleteResource.bind(resourceController),
    bodyValidation: ValidatorDto.middleware([
      "id",
      "name",
      "content",
      "version",
      "parentTopicId",
    ]),
  })
  .setRouter(router)
  .build();

logger.info(``);

export { router };
