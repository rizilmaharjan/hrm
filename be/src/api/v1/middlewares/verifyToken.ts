import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../../../config/env";
import { appError } from "../helpers/appError";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(new appError(401, "unauthorized: Missing token"));
  jwt.verify(
    token,
    env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: any) => {
      if (err) return next(new appError(401, "unauthorized: Invalid token"));
      res.locals.user = user;
      //   console.log(user);
      next();
    }
  );
};
