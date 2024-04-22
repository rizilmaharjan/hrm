import { NextFunction, Request, Response } from "express";
import {
  allowanceDelete,
  allowanceUpdate,
  createAllowance,
  getAllAllowances,
} from "../services/allowanceServices";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const postAllowance = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_By: username };
    const { status, message, data } = await createAllowance(body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    return res.status(status).json({ message, data });
  }
);

export const getAllowance = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, allowance } = await getAllAllowances();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ allowance, message });
  }
);

export const deleteAllowance = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await allowanceDelete(id);
    return res.status(status).json({ message });
  }
);
export const updateAllowance = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = { ...req.body };
    const { status, message } = await allowanceUpdate(body, id);
    return res.status(status).json({ message });
  }
);
