import { NextFunction, Request, Response } from "express";
import {
  createService,
  getAllServiceEvents,
  serviceDelete,
  serviceUpdate,
} from "../services/serviceEvent";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const postService = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_By: username };
    console.log("service event values", body);
    const { status, message, data } = await createService(body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    return res.status(status).json({ message, data });
  }
);
export const getService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("this is request query", req.query);

    // const { search } = req.query;
    // console.log("search", req.query);
    // console.log("search again", req.query.search);
    // const { search } = req.query;
    const search = req.query.search as string | undefined;
    // console.log("search again", typeof search);
    // const searchServices = search ? search : undefined
    const { status, message, serviceEvents } = await getAllServiceEvents(
      search
    );
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
