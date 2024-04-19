import { connectToDB } from "../../../config/database";

export const userLogin = async (
  username: string,
  hashedPassword: string
): Promise<{ status?: number; message?: string; userData?: any }> => {
  try {
    const connection = await connectToDB();
    const result = await connection.execute(
      `SELECT USER_CD FROM secu_user_mst WHERE USER_CD = :username AND USER_PASSWORD = decrypt_password(:hashedPassword, USER_PASSWORD)`,
      { username, hashedPassword }
    );

    if (result.rows && result.rows.length > 0) {
      const rows: any[] = result.rows;
      const users = rows.map((row) => {
        return {
          USER_CD: row[0],
        };
      });
      const userData = users[0];
      return { status: 200, message: "User logged in successfully", userData };
    } else {
      return { status: 401, message: "Invalid username or password" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
