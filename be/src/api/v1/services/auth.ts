import {
  userChangePassword,
  hrLogin,
  employeeLogin,
} from "../models/authModel";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import { isHRUsername } from "../helpers/auth";

export const loginUser = async (
  username: string,
  password: string
): Promise<{
  status: number;
  message: string;
  token?: string;
  userData?: any;
}> => {
  try {
    let response;
    if (isHRUsername(username)) {
      // authenticate as HR
      response = await hrLogin(username, password);
    } else {
      // authenticate as user
      response = await employeeLogin(username, password);
    }
    // const response = await userLogin(username, password);
    const {
      status = 500,
      userData,
      message = "something went wrong",
    } = response;
    if (status === 200) {
      const token = jwt.sign(
        {
          username: isHRUsername(username)
            ? (userData as { USER_CD: string }).USER_CD
            : (userData as { EMPLOYEE_CD: string }).EMPLOYEE_CD,
          role: isHRUsername(username) ? "HR" : "Employee",
        },
        env.JWT_SECRET as string
      );
      return {
        status: 200,
        message: "Login successfull",
        token: token,
        userData: userData,
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
