import { connectToDB } from "../../../config/database";

export const getPayroll = async (
  fiscal_yr: string,
  process_month: string,
  pay_vch_no: number
) => {
  try {
    const connection = await connectToDB();
    console.log("Payroll Model: ", fiscal_yr, process_month, pay_vch_no);
    const sql = `SELECT employee_cd, fn_empname(employee_cd) empname, de, amt FROM vw_payrollhor WHERE fiscal_yr = :fiscal_yr AND process_month = :process_month AND pay_vch_no = :pay_vch_no ORDER BY sno`;
    const result = await connection.execute(sql, {
      fiscal_yr,
      process_month,
      pay_vch_no,
    });
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
      return { status: 404, message: "Not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
