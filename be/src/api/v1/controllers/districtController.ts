import { Request, Response } from "express";

import * as DistrictService from "../services/districtService";
import { catchAsync } from "../helpers/catchAsync";

export const postDistrict = catchAsync(async (req: Request, res: Response) => {
  const { status, message } = await DistrictService.postDistrict(req.body);
  return res.status(status).json(message);
});

export const getDistrict = catchAsync(async (req: Request, res: Response) => {
  const { status, message, data } = await DistrictService.getDistrict();
  if (status === 404) {
    return res.status(status).json({ message });
  }
  return res.status(status).json({ message, data });
});

export const deleteDistrict = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message } = await DistrictService.deleteDistrict(id);
    return res.status(status).json({ message });
  }
);

export const updateDistrict = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const { status, message } = await DistrictService.updateDistrict(id, body);
    return res.status(status).json({ message });
  }
);
