import { Request, Response } from "express";

import * as JobTypeService from "../services/index";

export const postJobType = async (req: Request, res: Response) => {
  try {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_by: username };
    const { status, message, data } = await JobTypeService.postJobType(body);
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getJobType = async (req: Request, res: Response) => {
  try {
    const { status, message, data } = await JobTypeService.getJobType();
    return res.status(status).json({ message, data });
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

export const deleteJobType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, message } = await JobTypeService.deleteJobType(id);
    return res.status(status).json({ message });
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

export const updateJobType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { status, message } = await JobTypeService.updateJobType(id, body);
    return res.status(status).json({ message });
  } catch (error: any) {
    return res.status(400).json(error);
  }
};
