import { Request, Response } from "express";
import { loginUser } from "../services";
import { NextFunction } from "express-serve-static-core";
import { catchAsync } from "../../utils/catchAsync";
import { appError } from "../../utils/appError";

export const userLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, hashedPassword } = req.body;
    const { status, message, token, userData } = await loginUser(
      username,
      hashedPassword
    );
    if (status === 401) {
      next(new appError(status, message));
    }
    // const expiryDate = new Date(Date.now() + 3600000);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(status)
      .json({ message, userData });
  }
);

export const userLogout = async (req: Request, res: Response) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully" });
};
