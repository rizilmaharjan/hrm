import { Request, Response } from "express";
import {
  createService,
  getAllServiceEvents,
  serviceDelete,
  serviceUpdate,
} from "../services";

export const postService = async (req: Request, res: Response) => {
  try {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_By: username };
    const { status, message, data } = await createService(body);
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getService = async (req: Request, res: Response) => {
  try {
    const { status, message, serviceEvents } = await getAllServiceEvents();
    return res.status(status).json({ serviceEvents, message });
  } catch (error) {}
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { status, message } = await serviceDelete(id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = res.locals.user;

  // console.log("update id", id);
  try {
    const body = { ...req.body, updated_by: username };
    console.log("update body", body);
    const { status, message } = await serviceUpdate(body, id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
