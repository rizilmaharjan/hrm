import { NextFunction, Request, Response } from "express";
import {
  createService,
  getAllServiceEvents,
  serviceDelete,
  serviceUpdate,
} from "../services/serviceEvent";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const postService = catchAsync(async (req: Request, res: Response) => {
  const { username } = res.locals.user;
  const body = { ...req.body, entered_By: username };
  const { status, message, data } = await createService(body);
  return res.status(status).json({ message, data });
});
export const getService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, serviceEvents } = await getAllServiceEvents();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ serviceEvents, message });
  }
);

export const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await serviceDelete(id);
  return res.status(status).json({ message });
});
export const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = res.locals.user;

  // console.log("update id", id);
  const body = { ...req.body, updated_by: username };
  console.log("update body", body);
  const { status, message } = await serviceUpdate(body, id);
  return res.status(status).json({ message });
});
