import { connectToDB } from "../../../config/database";

export const getAccount = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM ACC_MST`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const account = rows.map((row: any[]) => {
        return {
          acc_cd: row[0],
          acc_desc: row[1],
          acc_type: row[12],
        };
      });
      return {
        status: 200,
        message: "Account fetched successfully",
        data: account,
      };
    } else {
      return { status: 404, message: "Account not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
