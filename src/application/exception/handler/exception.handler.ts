import { HttpCodes } from "../http/http-codes.exception";
import { HttpException } from "../http/http.exception";
import { NextFunction, Request, Response } from "express";

export class ExceptionHandler {
  static handle(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpException) {
      res.status(error.statusCode).json({ message: error.message, statusCode: error.statusCode });
      return;
    }
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}