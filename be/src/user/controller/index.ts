import { Request, Response } from "express";
import { createUser, getUsers, userDelete, userUpdate } from "../services";
import { catchAsync } from "../../utils/catchAsync";

export const postUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const { status, message, data } = await createUser(body);
  return res.status(status).json({ message, data });
});
export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { status, message, users } = await getUsers();
  return res.status(status).json({ users, message });
});
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("update id", id);
  const body = req.body;
  const { status, message } = await userUpdate(body, id);
  return res.status(status).json({ message });
});
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await userDelete(id);
  return res.status(status).json({ message });
});
