import { NextFunction, Request, Response } from "express";
import * as ReligionService from "../services/religionService";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const postReligion = catchAsync(async (req: Request, res: Response) => {
  const { username } = res.locals.user;
  const body = { ...req.body, entered_by: username };
  const { status, message } = await ReligionService.postReligion(body);
  return res.status(status).json({ message });
});

export const getReligion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await ReligionService.getReligion();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const deleteReligion = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await ReligionService.deleteReligion(id);
    return res.status(status).json({ message });
  }
);

export const updateReligion = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = res.locals.user;
    const body = { ...req.body, entered_by: username };
    const { status, message } = await ReligionService.updateReligion(id, body);
    return res.status(status).json({ message });
  }
);
