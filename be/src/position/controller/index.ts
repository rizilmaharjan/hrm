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

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { status, message } = await PositionService.updatePosition(id, body);
    return res.status(status).json({ message });
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, message } = await PositionService.deletePosition(id);
    return res.status(status).json({ message });
  } catch (error: any) {
    return res.status(400).json(error);
  }
};
