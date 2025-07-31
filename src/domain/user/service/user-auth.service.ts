import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";
import { HttpException } from "../../../application/exception/http/http.exception";
import { Jwt } from "../../../shared/jwt/jwt";
import { User, UserRole } from "../model/user.model";
import { UserRepository } from "../repository/user.abstract.repository";
import { RouteBuilder } from "../../../interface/api/route/utils/builder/route.builder";
import { RoutePermissions } from "../../../interface/api/route/utils/permissions/route.permissions";

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    const routeMetadata = RouteBuilder.routesMetadata.find(
      (route) => {
        if (route.path.includes('/:')) {
          return req.path.replace("/api/v1", "").includes(route.path.replace(`:${route.path.split('/:')[1]}`, "")) && route.method.toLowerCase() === req.method.toLowerCase()
        }
        return route.path === req.path.replace("/api/v1", "") && route.method.toLowerCase() === req.method.toLowerCase()
      },
    );
    if (routeMetadata?.public) {
      next();
      return;
    }

    const token = req.headers.authorization?.includes("Bearer") ? req.headers.authorization?.replace("Bearer ", "") : req.headers.authorization;
    if (!token) {
      throw new HttpException(HttpCodes.UNAUTHORIZED, "Token is required");
    }
    const decoded = await this.authenticateToken(token);
    if (!decoded) {
      throw new HttpException(HttpCodes.UNAUTHORIZED, "Invalid token");
    }

    const user = await this.userRepository.getUserByEmail(decoded.email);
    if (!user) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    const userData = new User(user.id, user.name, user.email, user.role, user.createdAt, user.updatedAt);

    routeMetadata?.permissions.forEach((permission) => {
      switch (permission) {
        case RoutePermissions.VIEW:
          if (!userData.getUserPermission().canView()) {
            throw new HttpException(HttpCodes.UNAUTHORIZED, "User does not have permission to view this route");
          }
          break;
        case RoutePermissions.EDIT:
          console.log('EDIT::userData: ', userData.getUserPermission().canEdit());
          if (!userData.getUserPermission().canEdit()) {
            throw new HttpException(HttpCodes.UNAUTHORIZED, "User does not have permission to edit this route");
          }
          break;
        case RoutePermissions.CREATE:
          if (!userData.getUserPermission().canCreate()) {
            throw new HttpException(HttpCodes.UNAUTHORIZED, "User does not have permission to create this route");
          }
          break;
        case RoutePermissions.DELETE:
          if (!userData.getUserPermission().canDelete()) {
            throw new HttpException(HttpCodes.UNAUTHORIZED, "User does not have permission to delete this route");
          }
          break;
        default:
          throw new HttpException(HttpCodes.UNAUTHORIZED, "User does not have permission to access this route");
      }
    });

    next();
  }

  async login(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new HttpException(HttpCodes.NOT_FOUND, "User not found");
    }
    return {
      token: await this.generateToken(user),
      user,
    };
  }

  async register(user: User) {
    const userExists = await this.userRepository.getUserByEmail(user.email);
    if (userExists) {
      throw new HttpException(HttpCodes.BAD_REQUEST, "User already exists");
    }
    return this.userRepository.createUser(user);
  }

  private async generateToken(user: User): Promise<string> {
    return Jwt.sign({ id: user.id, email: user.email, role: user.role });
  }

  private async authenticateToken(token: string): Promise<User | undefined> {
    const decoded = Jwt.verify(token) as JwtPayload;
    if (!decoded) {
      return undefined;
    }
    return this.userRepository.getUserById(decoded.id);
  }
}
