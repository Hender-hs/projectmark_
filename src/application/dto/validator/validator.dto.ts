import { NextFunction } from "express";

export class ValidatorDto {
  static validate(data: any, schema: string[]) {
    schema.forEach((key) => {
      if (data[key] === undefined) {
        throw new Error(`Invalid body: ${key} is required`);
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