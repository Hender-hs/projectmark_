import jwt from "jsonwebtoken";

export class Jwt {
  static sign(payload: any, expiresIn: string = "1w") {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
  }

  static verify(token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    return jwt.verify(token, secret);
  }
}
