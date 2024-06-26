import OracleDB from "oracledb";
import { connectToDB } from "../../../config/database";
import { ExecuteResultService } from "../interfaces/model.interface";

export const postService = async (
  service: any
): Promise<{ status: number; message: string; data?: any }> => {
  console.log("service", service);
  try {
    const connection = await connectToDB();

    // const id = uuidv4();
    const enteredDt = new Date().toISOString().slice(0, 10);
    const sql = `
    INSERT INTO service_event (SERVICE_EVENT_CD,SERVICE_EVENT_DESC,SERVICE_EVENT_DESC_NEP, DISABLED, ENTERED_BY, ENTERED_DT, SERVICE_EVENT_TYPE, IS_AUTO_SALARY_ADJUST)
    VALUES (:SERVICE_EVENT_CD,:SERVICE_EVENT_DESC, :SERVICE_EVENT_DESC_NEP,  :DISABLED, :ENTERED_BY, TO_DATE(:ENTERED_DT, 'YYYY-MM-DD'), :SERVICE_EVENT_TYPE, :IS_AUTO_SALARY_ADJUST)
    RETURNING SERVICE_EVENT_CD, SERVICE_EVENT_DESC, SERVICE_EVENT_DESC_NEP,DISABLED,SERVICE_EVENT_TYPE,IS_AUTO_SALARY_ADJUST INTO :new_service_event_cd, :new_event_desc, :new_event_desc_nep, :new_disabled, :new_service_event_type, :new_service_salary_adjust

  `;

    const result: ExecuteResultService = await connection.execute(sql, {
      SERVICE_EVENT_CD: service.SERVICE_EVENT_CD,
      SERVICE_EVENT_DESC: service.SERVICE_EVENT_DESC,
      SERVICE_EVENT_DESC_NEP: service.SERVICE_EVENT_DESC_NEP,
      DISABLED: service.DISABLED,
      ENTERED_BY: service.entered_By,
      ENTERED_DT: enteredDt,
      SERVICE_EVENT_TYPE: service.SERVICE_EVENT_TYPE,
      IS_AUTO_SALARY_ADJUST: service.SALARY_ADJUST,
      new_service_event_cd: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_event_desc: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_event_desc_nep: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_disabled: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_service_event_type: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_service_salary_adjust: {
        dir: OracleDB.BIND_OUT,
        type: OracleDB.STRING,
      },
    });

    await connection.commit();
    await connection.close();

    const insertedData = {
      SERVICE_EVENT_CD:
        (result.outBinds?.new_service_event_cd &&
          result.outBinds.new_service_event_cd[0]) ||
        -1,
      SERVICE_EVENT_DESC:
        (result.outBinds?.new_event_desc &&
          result.outBinds.new_event_desc[0]) ||
        "",
      SERVICE_EVENT_DESC_NEP:
        (result.outBinds?.new_event_desc_nep &&
          result.outBinds.new_event_desc_nep[0]) ||
        "",
      DISABLED:
        (result.outBinds?.new_disabled && result.outBinds.new_disabled[0]) ||
        "",
      SERVICE_EVENT_TYPE:
        (result.outBinds?.new_service_event_type &&
          result.outBinds.new_service_event_type[0]) ||
        "",
      SALARY_ADJUST:
        (result.outBinds?.new_service_salary_adjust &&
          result.outBinds.new_service_salary_adjust[0]) ||
        "",
    };

    return {
      status: 201,
      message: "Service inserted successfully",
      data: insertedData,
    };
  } catch (error: any) {
    if (error.message.includes("ORA-00001")) {
      return { status: 400, message: "Record with this ID already exists" };
      // throw new Error("Record with this ID already exists");
    } else {
      throw new Error(error.message);
    }
    // return { status: 500, message: error.message };
  }
};

export const getServices = async (
  search?: string
): Promise<{
  status: number;
  message: string;
  serviceEvents?: any;
}> => {
  try {
    const connection = await connectToDB();
    let sql = `SELECT * FROM service_event`;
    if (search) {
      // Add WHERE clause to filter based on search term
      sql += ` WHERE UPPER(SERVICE_EVENT_DESC) LIKE UPPER('%${search}%')`;
    }
    const result = await connection.execute(sql);

    await connection.close();

    if (result.rows) {
      const rows: any[] = result.rows;
      // console.log("service events datas", rows);

      const serviceEvents = rows.map((row: any[]) => {
        return {
          SERVICE_EVENT_CD: row[0],
          SERVICE_EVENT_DESC: row[1],
          SERVICE_EVENT_DESC_NEP: row[2],
          DISABLED: row[3],
          // ENTERED_BY: row[4],
          // ENTERED_DT: row[5],
          SERVICE_EVENT_TYPE: row[6],
          SALARY_ADJUST: row[7],
          // LAST_UPDATED_BY: row[8],
          // LAST_UPDATED_ON: row[9],
        };
      });

      return {
        status: 200,
        message: "Services fetched successfully",
        serviceEvents,
      };
    } else {
      return { status: 404, message: "Services not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const deleteService = async (
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM service_event WHERE SERVICE_EVENT_CD = :id`;
    const result = await connection.execute(sql, {
      id: id,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "Service deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const updateService = async (
  service: any,
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  try {
    const connection = await connectToDB();
    const updatedOn = new Date().toISOString().slice(0, 10);

    const sql = `UPDATE service_event SET SERVICE_EVENT_DESC = :SERVICE_EVENT_DESC, SERVICE_EVENT_DESC_NEP = :SERVICE_EVENT_DESC_NEP, DISABLED = :DISABLED, SERVICE_EVENT_TYPE = :SERVICE_EVENT_TYPE, IS_AUTO_SALARY_ADJUST = :IS_AUTO_SALARY_ADJUST, LAST_UPDATED_BY = :LAST_UPDATED_BY, LAST_UPDATED_ON = TO_DATE(:LAST_UPDATED_ON, 'YYYY-MM-DD') WHERE SERVICE_EVENT_CD = :id`;
    const result = await connection.execute(sql, {
      SERVICE_EVENT_DESC: service.SERVICE_EVENT_DESC,
      SERVICE_EVENT_DESC_NEP: service.SERVICE_EVENT_DESC_NEP,
      DISABLED: service.DISABLED,
      SERVICE_EVENT_TYPE: service.SERVICE_EVENT_TYPE,
      IS_AUTO_SALARY_ADJUST: service.SALARY_ADJUST,
      LAST_UPDATED_BY: service.updated_by,
      LAST_UPDATED_ON: updatedOn,
      id,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "Service updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
