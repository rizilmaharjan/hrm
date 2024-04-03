import { Request, Response } from "express";
import {
  allowanceDelete,
  allowanceUpdate,
  createAllowance,
  getAllAllowances,
} from "../services";

export const postAllowance = async (req: Request, res: Response) => {
  try {
    const { username } = res.locals.user;
    const body = { ...req.body, entered_By: username };
    const { status, message, data } = await createAllowance(body);
    return res.status(status).json({ message, data });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getAllowance = async (req: Request, res: Response) => {
  try {
    const { status, message, allowance } = await getAllAllowances();
    return res.status(status).json({ allowance, message });
  } catch (error) {}
};

export const deleteAllowance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { status, message } = await allowanceDelete(id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateAllowance = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { username } = res.locals.user;

  // console.log("update id", id);
  try {
    const body = { ...req.body };
    console.log("update body", body);
    const { status, message } = await allowanceUpdate(body, id);
    return res.status(status).json({ message });
  } catch (error) {
    return res.status(400).json(error);
  }
};
