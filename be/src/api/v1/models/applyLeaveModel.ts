import { connectToDB } from "../../../config/database";

export const applyLeave = async (leaveData: any) => {
  console.log("leave datas", leaveData);
  try {
    const connection = await connectToDB();

    const {
      LEAVE_APPLY_ID,
      EMPLOYEE_CD,
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      LEAVE_CD,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
    } = leaveData;

    const sql = `
      INSERT INTO employee_leave_apply (
        LEAVE_APPLY_ID,
        EMPLOYEE_CD,
        LEAVE_APPLIED_DT,
        LEAVE_APPLIED_DT_NEP,
        LEAVE_CD,
        FROM_LEAVE_DT,
        FROM_LEAVE_DT_NEP,
        TO_LEAVE_DT,
        TO_LEAVE_DT_NEP
      ) VALUES (
        :LEAVE_APPLY_ID,
        :EMPLOYEE_CD,
        TO_DATE(:LEAVE_APPLIED_DT, 'DD-MM-YYYY'),
        :LEAVE_APPLIED_DT_NEP,
        :LEAVE_CD,
        TO_DATE(:FROM_LEAVE_DT, 'DD-MM-YYYY'),
        :FROM_LEAVE_DT_NEP,
        TO_DATE(:TO_LEAVE_DT, 'DD-MM-YYYY'),
        :TO_LEAVE_DT_NEP
      )`;

    const bindParams = {
      LEAVE_APPLY_ID,
      EMPLOYEE_CD,
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      LEAVE_CD,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
    };

    const result = await connection.execute(sql, bindParams);
    console.log("result", result);
    await connection.commit();
    await connection.close();

    console.log("Leave applied successfully.");

    return {
      status: 201,
      message: "leave applied successfully",
      data: result.rows,
    };
  } catch (error) {
    console.error("Error applying leave:", error);
    throw error;
  }
};

export const getLeave = async (employeeCd: string) => {
  try {
    const connection = await connectToDB();

    let sql = `SELECT * FROM employee_leave_apply WHERE SUPERVISING_EMPLOYEE_CD = :employeeCd OR EMPLOYEE_CD = :employeeCd`;
    const binds = {
      employeeCd,
    };

    const result = await connection.execute<any[]>(sql, binds);
    await connection.close();

    // const result = await connection.execute(sql);
    // await connection.close();

    if (result.rows) {
      const leaveDatas = result.rows.map((row: any[]) => {
        return {
          LEAVE_APPLY_ID: row[0],
          EMPLOYEE_CD: row[1],
          LEAVE_APPLIED_DT: row[2],
          LEAVE_APPLIED_DT_NEP: row[3],
          LEAVE_CD: row[4],
          FROM_LEAVE_DT: row[5],
          FROM_LEAVE_DT_NEP: row[6],
          TO_LEAVE_DT: row[7],
          TO_LEAVE_DT_NEP: row[8],
          NO_OF_DAYS: row[9],
          LEAVE_TYPE: row[10],
        };
      });

      console.log("Leave data", leaveDatas);
      return {
        status: 200,
        message: "Leave data fetched successfully",
        data: leaveDatas,
      };
    } else {
      return { status: 404, message: "Leave not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteLeave = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM employee_leave_apply WHERE LEAVE_APPLY_ID = ${id}`;
    const result = await connection.execute(sql);
    await connection.commit();
    await connection.close();
    return {
      status: 200,
      message: "leave deleted successfully",
      data: result.rows,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateLeave = async (leaveData: any, id: string) => {
  try {
    const connection = await connectToDB();

    const {
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
      NO_OF_DAYS,
      LEAVE_TYPE,
    } = leaveData;

    const sql = `
      UPDATE employee_leave_apply
      SET
        LEAVE_APPLIED_DT = TO_DATE(:LEAVE_APPLIED_DT, 'DD-MM-YYYY'),
        LEAVE_APPLIED_DT_NEP = :LEAVE_APPLIED_DT_NEP,
        FROM_LEAVE_DT = TO_DATE(:FROM_LEAVE_DT, 'DD-MM-YYYY'),
        FROM_LEAVE_DT_NEP = :FROM_LEAVE_DT_NEP,
        TO_LEAVE_DT = TO_DATE(:TO_LEAVE_DT, 'DD-MM-YYYY'),
        TO_LEAVE_DT_NEP = :TO_LEAVE_DT_NEP,
        NO_OF_DAYS = :NO_OF_DAYS,
        LEAVE_TYPE = :LEAVE_TYPE,
      WHERE
        LEAVE_APPLY_ID = :LEAVE_APPLY_ID`;

    const binds = {
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
      NO_OF_DAYS,
      LEAVE_TYPE,

      LEAVE_APPLY_ID: id,
    };

    await connection.execute(sql, binds, { autoCommit: false });

    await connection.commit();
    await connection.close();

    return {
      status: 200,
      message: "Leave updated successfully",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
