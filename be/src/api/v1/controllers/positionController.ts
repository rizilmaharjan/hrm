import { NextFunction, Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
import { catchAsync } from "../helpers/catchAsync";
import * as PositionService from "../services/position";
import { appError } from "../helpers/appError";

export const postPosition = catchAsync(async (req: Request, res: Response) => {
  const { username } = res.locals.user;
  const body = { ...req.body, entered_by: username };
  const { status, message } = await PositionService.postPosition(body);
  return res.status(status).json({ message });
});

export const getPosition = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await PositionService.getPosition();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const updatePosition = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const { status, message } = await PositionService.updatePosition(id, body);
    return res.status(status).json({ message });
  }
);

export const deletePosition = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await PositionService.deletePosition(id);
    return res.status(status).json({ message });
  }
);
