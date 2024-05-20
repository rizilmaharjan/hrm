import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../helpers/catchAsync";
import * as MenuService from "../services/menuService";
import { appError } from "../helpers/appError";

export const getMenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await MenuService.getMenu();
    if (status === 400) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);
