import { NextFunction, Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
import { catchAsync } from "../helpers/catchAsync";

import * as JobTypeService from "../services/jobType";
import { appError } from "../helpers/appError";

export const postJobType = catchAsync(
  async (req: any, res: any, next: NextFunction) => {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_by: username };
    const { status, message, data } = await JobTypeService.postJobType(body);
    if (status === 400) {
      next(new appError(status, message));
      return;
    }
    return res.status(status).json({ message, data });
  }
);

export const getJobType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = await JobTypeService.getJobType();
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message, data });
  }
);

export const deleteJobType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await JobTypeService.deleteJobType(id);
  return res.status(status).json({ message });
});

export const updateJobType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const { status, message } = await JobTypeService.updateJobType(id, body);
  return res.status(status).json({ message });
});
