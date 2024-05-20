import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import * as DropdownService from "../services/dropdownService";
import { appError } from "../helpers/appError";

export const getLeaveType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await DropdownService.getLeaveType();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);
