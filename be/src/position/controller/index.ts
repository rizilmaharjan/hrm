import { Request, Response } from "express";

import * as PositionService from "../services/index";

export const postPosition = async (req: Request, res: Response) => {
  try {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_by: username };
    const { status, message } = await PositionService.postPosition(body);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPosition = async (req: Request, res: Response) => {
  try {
    const { status, message, data } = await PositionService.getPosition();
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.status(400).json(error);
  }
};
