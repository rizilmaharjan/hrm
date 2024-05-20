import { connectToDB } from "../../../config/database";

export const getLeaveType = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM leave_mst`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const leaveType = rows.map((row: any[]) => {
        return {
          leave_cd: row[0],
          leave_desc: row[1],
        };
      });
      return {
        status: 200,
        message: "Leave Type fetched successfully",
        data: leaveType,
      };
    } else {
      return {
        status: 404,
        message: "Leave Type not found",
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
