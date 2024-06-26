import { connectToDB } from "../../../config/database";

export const hrLogin = async (username: string, password: string) => {
  try {
    const connection = await connectToDB();
    const result = await connection.execute(
      `SELECT USER_CD,SUPER_USER FROM secu_user_mst WHERE USER_CD = :username AND USER_PASSWORD = decrypt_password(:password, USER_PASSWORD)`,
      { username, password }
    );

    if (result.rows && result.rows.length > 0) {
      const rows: any[] = result.rows;
      const users = rows.map((row) => {
        return {
          USER_CD: row[0],
          role: "admin",
        };
      });
      const userData = users[0];
      return {
        status: 200,
        message: "User logged in successfully",
        users,
        userData,
      };
    } else {
      return { status: 401, message: "Invalid username or password" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const employeeLogin = async (username: string, password: string) => {
  try {
    const connection = await connectToDB();
    const result = await connection.execute(
      `SELECT EMPLOYEE_CD FROM employee WHERE EMPLOYEE_CD = :username AND  EMP_PASSWORD = :password`,
      { username, password }
    );
    // console.log("result", result);

    if (result.rows && result.rows.length > 0) {
      const rows: any[] = result.rows;
      const users = rows.map((row) => {
        return {
          EMPLOYEE_CD: row[0],
          role: "employee",
        };
      });
      const userData = users[0];
      return {
        status: 200,
        message: "User logged in successfully",
        userData,
      };
    } else {
      return { status: 401, message: "Invalid username or password" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userChangePassword = async (
  oldPassword: string,
  newPassword: string,
  username: string
) => {
  try {
    const connection = await connectToDB();

    // Check if the old password matches
    const checkOldPasswordQuery = `
      SELECT USER_CD
      FROM secu_user_mst
      WHERE USER_CD = :username
      AND USER_PASSWORD = decrypt_password(:oldPassword, USER_PASSWORD)`;

    const checkOldPasswordResult = await connection.execute(
      checkOldPasswordQuery,
      { username, oldPassword }
    );

    // If no rows returned, username doesn't exist or old password doesn't match
    if (
      !checkOldPasswordResult.rows ||
      checkOldPasswordResult.rows.length === 0
    ) {
      throw new Error("Old password is incorrect or user not found");
    }

    // Update the password
    const updatePasswordQuery = `
      UPDATE secu_user_mst
      SET  USER_PASSWORD = encrypt_password(:newPassword)
      WHERE  USER_CD = :username`;

    const result = await connection.execute(updatePasswordQuery, {
      username,
      newPassword,
    });
    await connection.commit();

    await connection.close();

    return { status: 200, message: "Password changed successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
