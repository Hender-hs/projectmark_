export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
  }

  static notFound(message: string) {
    return new HttpException(404, message);
  }

  static badRequest(message: string) {
    return new HttpException(400, message);
  }

  static internalServerError(message: string) {
    return new HttpException(500, message);
  }
}
