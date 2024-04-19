import { connectToDB } from "../../../config/database";

export const getEmployee = async (pageNumber: number, pageSize: number) => {
  try {
    const connection = await connectToDB();
    const offset = (pageNumber - 1) * pageSize;
    const count = await connection.execute(
      `SELECT COUNT(*) AS row_count FROM EMPLOYEE`
    );
    const rowCount = count.rows ? (count.rows as any[])[0]?.[0] : 0;

    const sql = `SELECT *
    FROM (
        SELECT e.*, ROWNUM AS rn
        FROM EMPLOYEE e
    )
    WHERE rn > ${offset}
    AND ROWNUM <= ${pageSize}`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const employees = rows.map((row: any[]) => {
        return {
          employee_cd: row[0],
          first_name: row[1],
          middle_name: row[2],
          sur_name: row[3],
          birth_dt: row[7],
          gender: row[9],
          marital_status: row[10],
          religion_cd: row[13],
          email: row[24],
          mobile: row[25],
        };
      });
      return {
        status: 200,
        message: "Employees fetched successfully",
        employees,
        rowCount,
      };
    } else {
      return { status: 404, message: "Employees not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM EMPLOYEE WHERE employee_cd = :id`;
    const result = await connection.execute(sql, { id });
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;

      const employees = rows.map((row: any[]) => {
        return {
          employee_cd: row[0],
          first_name: row[1],
          middle_name: row[2],
          sur_name: row[3],
          birth_dt: row[7],
          gender: row[9],
          marital_status: row[10],
          religion_cd: row[13],
          citizenship_no: row[21],
          email: row[24],
          mobile: row[25],
        };
      });
      return {
        status: 200,
        message: "Employees fetched successfully",
        data: employees,
      };
    } else {
      return { status: 404, message: "Employees not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
