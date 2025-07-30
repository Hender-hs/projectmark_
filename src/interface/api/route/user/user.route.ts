import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { RouteBuilder } from "../utils/builder/route-builder";

const router = Router();
const { userController, logger } = Di.getInstance();

const ROUTE_GROUP = "/user";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /user`);

routeBuilder
  .setRoute({
    path: "/:id",
    method: "get",
    handler: userController.getUserById.bind(userController),
  })
  .setRouter(router)
  .build();

logger.info(``);

export { router };
