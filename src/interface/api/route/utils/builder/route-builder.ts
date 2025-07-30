import { NextFunction, RequestHandler, Router } from "express";
import { Di } from "../../../../../shared/di/init.di";
import { HttpCodes } from "../../../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../../../application/exception/http/http.exception";

interface RouteBuilderProps {
  path: string;
  method: string;
  handler: (...args: any[]) => any;
  bodyValidation?: (req: Request, res: Response, next: NextFunction) => void;
}

export class RouteBuilder {
  private router: Router | null = null;
  private logger = Di.getInstance().logger;
  private routeGroup: string = "/";
  private route: RouteBuilderProps | null = null;

  constructor() {}

  setRoute(route: RouteBuilderProps) {
    this.route = route;
    return this;
  }

  setRouteGroup(routeGroup: string) {
    this.routeGroup = routeGroup;
    return this;
  }

  setRouter(router: Router) {
    this.router = router;
    return this;
  }

  build() {
    if (!this.router || !this.route) {
      throw new HttpException(HttpCodes.INTERNAL_SERVER_ERROR, "Route instance was not properly set");
    }

    const params = [this.route.handler.bind(this.route.handler)] as Array<RequestHandler<any, any, any, any, any>>;
    if (this.route.bodyValidation) {
      params.unshift(this.route.bodyValidation as unknown as RequestHandler<any, any, any, any, any>);
    }

    switch (this.route.method) {
      case "get":
        this.router.get(`${this.routeGroup}${this.route.path}`, ...params);
        break;
      case "post":
        this.router.post(`${this.routeGroup}${this.route.path}`, ...params);
        break;
      case "put":
        this.router.put(`${this.routeGroup}${this.route.path}`, ...params);
        break;
      case "delete":
        this.router.delete(`${this.routeGroup}${this.route.path}`, ...params);
        break;
      default:
        throw new HttpException(HttpCodes.BAD_REQUEST, `Invalid method: ${this.route.method}`);
    }

    this.logger.info(`Mapped route: ${this.route.method.toUpperCase()} ${this.routeGroup}${this.route.path}`);
  }
}