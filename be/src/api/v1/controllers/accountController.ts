import { NextFunction, Request, Response } from "express";
import * as AccountService from "../services/accountService";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const getAllowance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await AccountService.getAccount();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);
