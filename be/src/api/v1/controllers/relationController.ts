import { NextFunction, Request, Response } from "express";
import * as RelationService from "../services/relationService";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const postRelation = catchAsync(async (req: Request, res: Response) => {
  const { username } = res.locals.user;
  const body = { ...req.body, entered_by: username };
  const { status, message } = await RelationService.postRelation(body);
  return res.status(status).json({ message });
});

export const getRelation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await RelationService.getRelation();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const deleteRelation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await RelationService.deleteRelation(id);
    return res.status(status).json({ message });
  }
);

export const updateRelation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = res.locals.user;
    const body = { ...req.body, entered_by: username };
    const { status, message } = await RelationService.updateRelation(id, body);
    return res.status(status).json({ message });
  }
);
