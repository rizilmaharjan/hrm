import { connectToDB } from "../../../config/database";

export const getPayroll = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT employee_cd, fn_empname(employee_cd) empname, de, amt FROM vw_payrollhor WHERE pay_vch_no = '798000018' ORDER BY sno
    `;
    const result = await connection.execute(sql);
    await connection.close();
    // console.log(result);
    if (result.rows) {
      const rows: any[] = result.rows;
      const employees = rows.map((row: any[]) => {
        return {
          employee_cd: row[0],
          empname: row[1],
          de: row[2],
          amt: row[3],
        };
      });
      return {
        status: 200,
        message: "success",
        data: employees,
      };
    } else {
      return { status: 404, message: " Not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
