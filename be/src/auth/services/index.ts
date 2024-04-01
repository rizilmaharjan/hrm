import { userLogin } from "../repository";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const loginUser = async (
  username: string,
  hashedPassword: string
): Promise<{
  status: number;
  message: string;
  token?: string;
  userData?: any;
}> => {
  try {
    const response = await userLogin(username, hashedPassword);
    if (response.status === 200) {
      const token = jwt.sign(
        {
          username: response.userData.USER_CD,
        },
        env.JWT_SECRET as string,
        { expiresIn: 3600 }
      );
      return {
        status: 200,
        message: "Login successful",
        token: token,
        userData: response.userData,
      };
    }
    return response;
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
