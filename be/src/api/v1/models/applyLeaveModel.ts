import { connectToDB } from "../../../config/database";

export const applyLeave = async (leaveData: any, username: string) => {
  console.log("leave datas", leaveData);
  try {
    const connection = await connectToDB();

    const {
      LEAVE_APPLY_ID,
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      LEAVE_CD,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
      LEAVE_TYPE,
      PHONE_NO,
      REMARKS,
      JOB_ASSIGN_TO,
      SUPERVISING_EMPLOYEE_CD,
      SANCTIONING_EMPLOYEE_CD,
    } = leaveData;

    // Query to check the leave balance
    const balanceSql = `
      SELECT LEAVE_BALANCE
      FROM leave_balance
      WHERE EMPLOYEE_CD = :username AND LEAVE_CD = :leaveCd
    `;
    const balanceResult: any = await connection.execute(balanceSql, {
      username,
      leaveCd: LEAVE_CD,
    });

    if (
      !balanceResult.rows ||
      balanceResult.rows.length === 0 ||
      balanceResult.rows[0][0] <= 0
    ) {
      await connection.close();
      return {
        status: 400,
        message: "Insufficient leave balance",
      };
    }

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
        TO_LEAVE_DT_NEP,
        LEAVE_TYPE,
        PHONE_NO,
        REMARKS,
        JOB_ASSIGN_TO,
        SUPERVISING_EMPLOYEE_CD,
        SANCTIONING_EMPLOYEE_CD
      ) VALUES (
        :LEAVE_APPLY_ID,
        :EMPLOYEE_CD,
        TO_DATE(:LEAVE_APPLIED_DT, 'DD-MM-YYYY'),
        :LEAVE_APPLIED_DT_NEP,
        :LEAVE_CD,
        TO_DATE(:FROM_LEAVE_DT, 'DD-MM-YYYY'),
        :FROM_LEAVE_DT_NEP,
        TO_DATE(:TO_LEAVE_DT, 'DD-MM-YYYY'),
        :TO_LEAVE_DT_NEP,
        :LEAVE_TYPE,
        :PHONE_NO,
        :REMARKS,
        :JOB_ASSIGN_TO,
        :SUPERVISING_EMPLOYEE_CD,
        :SANCTIONING_EMPLOYEE_CD
      )
    `;

    const bindParams = {
      LEAVE_APPLY_ID,
      EMPLOYEE_CD: username,
      LEAVE_APPLIED_DT,
      LEAVE_APPLIED_DT_NEP,
      LEAVE_CD,
      FROM_LEAVE_DT,
      FROM_LEAVE_DT_NEP,
      TO_LEAVE_DT,
      TO_LEAVE_DT_NEP,
      LEAVE_TYPE,
      PHONE_NO,
      REMARKS,
      JOB_ASSIGN_TO,
      SUPERVISING_EMPLOYEE_CD,
      SANCTIONING_EMPLOYEE_CD,
    };

    const result = await connection.execute(sql, bindParams);
    console.log("result", result);
    await connection.commit();
    await connection.close();

    return {
      status: 201,
      message: "Leave applied successfully",
      data: result.rows,
    };
  } catch (error: any) {
    throw new Error(error.message);
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

export const nepToEng = async (date: { nepaliDate: string }) => {
  try {
    const connection = await connectToDB();

    const sql = `SELECT fn_neptoeng(:fromDate) as convertedDate FROM dual`;
    const result: any = await connection.execute(sql, {
      fromDate: date.nepaliDate,
    });
    await connection.close();
    console.log("result", result);

    if (!result.rows || result.rows.length === 0) {
      return {
        status: 404,
        message: "Date not found",
      };
    }

    const convertedDate = result.rows[0][0];

    return {
      status: 200,
      message: "Date converted successfully",
      data: convertedDate,
    };
  } catch (error: any) {
    console.error(error.message); // Log the error for debugging purposes
    throw new Error(error.message);
  }
};
export const engToNep = async (date: { englishDate: string }) => {
  try {
    const connection = await connectToDB();

    const sql = `SELECT fn_engtonep(to_date(:fromDate,'YYYY-MM-DD')) as convertedDate FROM dual`;
    const result: any = await connection.execute(sql, {
      fromDate: date.englishDate,
    });
    await connection.close();

    if (!result.rows || result.rows.length === 0) {
      return {
        status: 404,
        message: "Date not found",
      };
    }

    const convertedDate = result.rows[0][0];

    return {
      status: 200,
      message: "Date converted successfully",
      data: convertedDate,
    };
  } catch (error: any) {
    console.error(error.message); // Log the error for debugging purposes
    throw new Error(error.message);
  }
};

export const leaveBalance = async (username: string) => {
  try {
    const connection = await connectToDB();
    const sql = `
      SELECT lb.EMPLOYEE_CD, lb.LEAVE_CD, lb.LEAVE_BALANCE, lb.ELIGIBLE_LEAVE,
             lb.LEAVE_UPDATED_DT, lb.MONTHLY_LEAVE_ADD_DT,
             lm.LEAVE_DESC AS LEAVE_TYPE
      FROM leave_balance lb
      JOIN leave_mst lm ON lb.LEAVE_CD = lm.LEAVE_CD
      WHERE lb.EMPLOYEE_CD = :username
    `;
    const result: any = await connection.execute(sql, [username]);

    if (!result.metaData || !result.rows) {
      throw new Error("No metadata or rows found");
    }

    // Extract the column names from metaData
    const columns = result.metaData.map((col: any) => col.name);

    // Map rows to an array of objects
    const rows = result.rows.map((row: any[]) => {
      let obj: any = {};
      columns.forEach((col: string, index: number) => {
        obj[col] = row[index];
      });
      return obj;
    });

    console.log("leave balance result", rows);

    await connection.close();

    return {
      status: 200,
      message: "Leave balance fetched successfully",
      data: rows,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
