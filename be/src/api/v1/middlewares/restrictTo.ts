import { Request, Response, NextFunction } from "express";
import { appError } from "../helpers/appError";
type TRoles = string[];

export const restrictTo = (...roles: TRoles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.user;
    if (!roles.includes(role)) {
      next(new appError(403, "You are not authorized to perform this action"));
    } else {
      next();
    }
  };
};
