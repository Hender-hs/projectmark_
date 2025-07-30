import { NextFunction } from "express";
import { HttpException } from "../../../application/exception/http/http.exception";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";

export class ValidatorDto {
  static validate(data: any, schema: string[]) {
    schema.forEach((key) => {
      if (data[key] === undefined) {
        throw new HttpException(HttpCodes.BAD_REQUEST, `Invalid body: ${key} is required`);
      }
    });
  }

  static middleware(schema: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      ValidatorDto.validate(req.body, schema);
      next();
    }
  }
}