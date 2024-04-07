import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { appError } from "../helpers/appError";

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      //   let zodErrors: Record<string, string> = {};
      let errorMessage = "";
      error.issues.forEach((issue: any, index: number) => {
        // zodErrors = { ...zodErrors, [issue.path[1]]: issue.message };
        errorMessage = `${issue.message}`;
      });
      //   return res.status(400).send({ errors: zodErrors });
      next(new appError(400, errorMessage));
    }
  };
