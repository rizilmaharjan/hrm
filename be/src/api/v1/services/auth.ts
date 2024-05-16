import { userChangePassword, userLogin } from "../models/authModel";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";

export const loginUser = async (
  username: string,
  password: string
): Promise<{
  status: number;
  message: string;
  token?: string;
  userData?: any[];
}> => {
  try {
    const response = await userLogin(username, password);
    const { status = 500, users, message = "something went wrong" } = response;
    if (status === 200 && users) {
      // console.log("users", users);
      const token = jwt.sign(
        {
          username: users[0].USER_CD,
          role: users[0].SUPER_USER,
        },
        env.JWT_SECRET as string
      );
      return {
        status: 200,
        message: "Login successfull",
        token: token,
        userData: users,
      };
    } else {
      // throw new appError(status, message);
      return {
        status,
        message,
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const changeUserPassword = async (
  oldPassword: string,
  newPassword: string,
  username: string
) => {
  try {
    const { status, message } = await userChangePassword(
      oldPassword,
      newPassword,
      username
    );
    return { status, message };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
