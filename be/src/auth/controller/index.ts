import { Request, Response } from "express";
import { loginUser } from "../services";
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { username, hashedPassword } = req.body;
    const { status, message, token, userData } = await loginUser(
      username,
      hashedPassword
    );
    const expiryDate = new Date(Date.now() + 3600000);
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(status)
      .json({ message, userData });
  } catch (error) {}
};
export const userLogout = async (req: Request, res: Response) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully" });
};
