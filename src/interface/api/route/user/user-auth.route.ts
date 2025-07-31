import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";
import { RouteBuilder } from "../utils/builder/route.builder";
import { ValidatorDto } from "../../../../application/dto/validator/validator.dto";
import { z } from "zod";
import { UserRole } from "../../../../domain/user/model/user.model";

const router = Router();
const { userAuthController, logger } = Di.getInstance();

const ROUTE_GROUP = "/user/auth";
const routeBuilder = new RouteBuilder().setRouteGroup(ROUTE_GROUP);

logger.info(`Route Group: /user/auth`);

routeBuilder
  .setRoute({
    path: "/register",
    method: "post",
    handler: userAuthController.register.bind(userAuthController),
    bodyValidation: ValidatorDto.middleware(z.object({
      name: z.string(),
      email: z.string(),
      role: z.nativeEnum(UserRole),
    })),
  })
  .setRouter(router)
  .setPublic()
  .build();

routeBuilder
  .setRoute({
    path: "/login",
    method: "post",
    handler: userAuthController.login.bind(userAuthController),
    bodyValidation: ValidatorDto.middleware(z.object({
      email: z.string(),
    })),
  })
  .setRouter(router)
  .setPublic()
  .build();

logger.info(``);

export { router };
