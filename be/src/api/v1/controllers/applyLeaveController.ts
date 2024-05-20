import { NextFunction } from "express";
import { catchAsync } from "../helpers/catchAsync";
import * as leaveService from "../services/applyLeaveService";
import { appError } from "../helpers/appError";

export const applyLeave = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { status, message, data } = await leaveService.applyLeave(req.body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    return res.status(status).json({ message, data });
  }
);

export const getLeave = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { username } = res.locals.user;

    const { status, message, data } = await leaveService.getLeave(username);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    console.log("leave datas in controller", data);

    return res.status(status).json({ message, data });
  }
);
export const deleteLeave = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await leaveService.deleteLeave(id);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    console.log("leave datas in controller", data);

    return res.status(status).json({ message, data });
  }
);
export const updateLeave = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { id } = req.params;
    const { status, message } = await leaveService.updateLeave(req.body, id);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }

    return res.status(status).json({ message });
  }
);
export const nepToEng = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { status, message, data } = await leaveService.nepToEng(req.body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }

    return res.status(status).json({ message, data });
  }
);
export const engToNep = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { status, message, data } = await leaveService.engToNep(req.body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }

    return res.status(status).json({ message, data });
  }
);
