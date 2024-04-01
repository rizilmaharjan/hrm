import OracleDB from "oracledb";

const oracleConfig = {
  user: "cpay",
  password: "c",
  // user: "system",
  // password: "root",
  connectionString: "192.168.10.219:1521/ORCL",
  // connectionString: "localhost:1521/XEPDB1",
};

export const userLogin = async (
  username: string,
  hashedPassword: string
): Promise<{ status: number; message: string; userData?: any }> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const result = await connection.execute(
      `SELECT USER_CD, USER_PASSWORD FROM secu_user_mst WHERE USER_CD = :username AND USER_PASSWORD = :hashedPassword`,
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
    return { status: 500, message: error.message };
  }
};
