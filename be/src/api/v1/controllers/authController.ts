import { Request, Response } from "express";
import { changeUserPassword, loginUser } from "../services/auth";
import { NextFunction } from "express-serve-static-core";
import { catchAsync } from "../helpers/catchAsync";
import { appError } from "../helpers/appError";

export const userLogin = catchAsync(async (req: any, res: any, next: any) => {
  const { username, password } = req.body;
  const { status, message, token, userData } = await loginUser(
    username,
    password
  );
  if (status === 200) {
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(status)
      .json({ message, userData });
  } else {
    return next(new appError(status, message));
  }
});

export const userLogout = async (req: Request, res: Response) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully" });
};
export const userChangePassword = catchAsync(
  async (req: any, res: any, next: any) => {
    const { username } = res.locals.user;

    const { oldPassword, newPassword } = req.body;
    const { status, message } = await changeUserPassword(
      oldPassword,
      newPassword,
      username
    );
    if (status === 200) {
      return res.status(status).json({ message });
    } else {
      return next(new appError(status, res.message));
    }
  }
);
