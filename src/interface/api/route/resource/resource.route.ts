import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { RouteBuilder } from "../utils/builder/route.builder";
import { RoutePermissions } from "../utils/permissions/route.permissions";
import * as z from "zod";
import { ResourceType } from "../../../../domain/resource/model/resource.model";

const router = Router();
const { resourceController, logger } = Di.getInstance();

const ROUTE_GROUP = "/resource";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /resource`);

routeBuilder
  .setRoute({
    path: "/:topicId",
    method: "get",
    handler: resourceController.getResourceByTopicId.bind(resourceController),
  })
  .setRouter(router)
  .build();

routeBuilder
  .setRoute({
    path: "/",
    method: "post",
    handler: resourceController.createResource.bind(resourceController),
    bodyValidation: ValidatorDto.middleware(z.object({
      url: z.string(),
      description: z.string(),
      type: z.nativeEnum(ResourceType),
      topicId: z.string(),
    })),
  })
  .setRouter(router)
  .setPermissions([RoutePermissions.CREATE])
  .build();

logger.info(``);

export { router };
