import { Di } from "../../../shared/di/init.di";
import { HttpCodes } from "../http/http-codes.exception";
import { HttpException } from "../http/http.exception";
import { NextFunction, Request, Response } from "express";

export class ExceptionHandler {
  private static logger = Di.getInstance().logger;

  static handle(error: Error, req: Request, res: Response, next: NextFunction) {
    ExceptionHandler.logger.error(`error: ${error.message} \n stack: ${error.stack}`);
    
    if (error instanceof HttpException) {
      res
        .status(error.statusCode)
        .json({ message: error.message, statusCode: error.statusCode });
      return;
    }
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}
