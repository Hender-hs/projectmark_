import { NextFunction } from "express";
import { HttpException } from "../../../application/exception/http/http.exception";
import { HttpCodes } from "../../../application/exception/http/http-codes.exception";
import * as z from "zod";

export class ValidatorDto {
  static validate(data: any, schema: z.ZodObject<any>) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new HttpException(HttpCodes.BAD_REQUEST, JSON.parse(parsed.error.message));
    }
  }

  static middleware(schema: z.ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      ValidatorDto.validate(req.body, schema);
      next();
    };
  }
}
