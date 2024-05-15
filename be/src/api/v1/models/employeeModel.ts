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

// update employee
export const updateEmployeeInfo = async (
  employeeId: string,
  employeeInfo: any
) => {
  try {
    const connection = await connectToDB();

    // Prepare the SQL statement for update
    const sql = `
      UPDATE EMPLOYEE
      SET
        first_name = :first_name,
        middle_name = :middle_name,
        sur_name = :sur_name,
        birth_dt = :birth_dt,
        gender = :gender,
        marital_status = :marital_status,
        citizenship_no = :citizenship_no,
        email = :email,
        mobile = :mobile
      WHERE employee_cd = :id
    `;

    // Convert birth_dt to Date format
    const birthDate = new Date(employeeInfo.birth_dt);

    // Bind parameters for update
    const bindParams = {
      first_name: employeeInfo.first_name,
      middle_name: employeeInfo.middle_name,
      sur_name: employeeInfo.sur_name,
      birth_dt: birthDate,
      gender: employeeInfo.gender,
      marital_status: employeeInfo.marital_status,
      citizenship_no: employeeInfo.citizenship_no,
      email: employeeInfo.email,
      mobile: employeeInfo.mobile,
      id: employeeId,
    };

    // Execute the update statement
    const result = await connection.execute(sql, bindParams);

    await connection.commit();

    // Close the connection
    await connection.close();

    // Check if any rows were affected by the update
    if (result.rowsAffected) {
      return { status: 200, message: "Employee updated successfully" };
    } else {
      return { status: 404, message: "Employee not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
