import OracleDB from "oracledb";
import { v4 as uuidv4 } from "uuid";

const oracleConfig = {
  user: "cpay",
  password: "c",
  // user: "system",
  // password: "root",
  connectionString: "192.168.10.219:1521/ORCL",
  // connectionString: "localhost:1521/XEPDB1",
};

interface ExecuteResult {
  outBinds?: {
    new_allowance_cd: string[];
    new_allowance_desc: string[];
    new_allowance_desc_nep: string[];
    new_taxable: string[];
    new_facility_percent: string[];
    new_cit_flag: string[];
    new_allowance_type: string[];
    new_allowance_facility: string[];
    new_salary_allowance_flag: string[];
    new_acc_cd: string[];
    new_disabled: string[];
  };
}
export const postAllowance = async (
  allowance: any
): Promise<{ status: number; message: string; data?: any }> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);

    // const id = uuidv4();
    const enteredDt = new Date().toISOString().slice(0, 10);
    console.log("allowances", allowance);
    const sql = `
    INSERT INTO ALLOWANCE (ALLOWANCE_CD, ALLOWANCE_FACILITY,ALLOWANCE_DESC,ALLOWANCE_DESC_NEP, TAXABLE, ALLOWANCE_TYPE,CIT_FLAG,SALARY_ALLOWANCE_FLAG, FACILITY_PERCENT, ACC_CD, DISABLED, ENTERED_BY, ENTERED_DT,   ORDER_SNO, IS_PF_RF_AS_SALARY)
    VALUES (:ALLOWANCE_CD, :ALLOWANCE_FACILITY, :ALLOWANCE_DESC, :ALLOWANCE_DESC_NEP,  :TAXABLE, :ALLOWANCE_TYPE, :CIT_FLAG,:SALARY_ALLOWANCE_FLAG,:FACILITY_PERCENT, :ACC_CD, :DISABLED, :ENTERED_BY, TO_DATE(:ENTERED_DT, 'YYYY-MM-DD'),  :ORDER_SNO, :IS_PF_RF_AS_SALARY  )
     RETURNING ALLOWANCE_CD, ALLOWANCE_FACILITY,  ALLOWANCE_DESC, ALLOWANCE_DESC_NEP,TAXABLE,ALLOWANCE_TYPE, CIT_FLAG,SALARY_ALLOWANCE_FLAG, FACILITY_PERCENT, ACC_CD,  DISABLED  INTO :new_allowance_cd, :new_allowance_facility, :new_allowance_desc, :new_allowance_desc_nep, :new_taxable, :new_allowance_type,  :new_cit_flag,:new_salary_allowance_flag,:new_facility_percent, :new_acc_cd,  :new_disabled


  `;

    const result: ExecuteResult = await connection.execute(sql, {
      ALLOWANCE_CD: allowance.allowance_CD,
      ALLOWANCE_FACILITY: allowance.allowance_facility,
      ALLOWANCE_DESC: allowance.allowance_description,
      ALLOWANCE_DESC_NEP: allowance.allowance_nepali_desc,
      TAXABLE: allowance.allowance_taxable,
      ALLOWANCE_TYPE: allowance.allowance_type,
      CIT_FLAG: allowance.allowance_cit,
      SALARY_ALLOWANCE_FLAG: allowance.salary_allowance_flag,
      FACILITY_PERCENT: allowance.allowance_facility_percent,
      ACC_CD: allowance.allowance_acc,
      DISABLED: allowance.allowance_disabled,
      ENTERED_BY: allowance.entered_By,
      ENTERED_DT: enteredDt,
      ORDER_SNO: allowance.order_Sno,
      IS_PF_RF_AS_SALARY: allowance.is_pf_rf_as_salary,
      new_allowance_cd: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_allowance_facility: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },

      new_allowance_desc: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_allowance_desc_nep: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_taxable: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_allowance_type: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_cit_flag: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_salary_allowance_flag: {
        dir: OracleDB.BIND_OUT,
        type: OracleDB.STRING,
      },

      new_facility_percent: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_acc_cd: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
      new_disabled: { dir: OracleDB.BIND_OUT, type: OracleDB.STRING },
    });

    await connection.commit();
    await connection.close();

    const insertedAllowance = {
      allowance_CD:
        (result.outBinds &&
          result.outBinds.new_allowance_cd &&
          result.outBinds.new_allowance_cd[0]) ||
        -1,
      allowance_facility:
        (result.outBinds &&
          result.outBinds.new_allowance_facility &&
          result.outBinds.new_allowance_facility[0]) ||
        "",
      allowance_description:
        (result.outBinds &&
          result.outBinds.new_allowance_desc &&
          result.outBinds.new_allowance_desc[0]) ||
        "",
      allowance_nepali_desc:
        (result.outBinds &&
          result.outBinds.new_allowance_desc_nep &&
          result.outBinds.new_allowance_desc_nep[0]) ||
        "",
      allowance_taxable:
        (result.outBinds &&
          result.outBinds.new_taxable &&
          result.outBinds.new_taxable[0]) ||
        "",

      allowance_type:
        (result.outBinds &&
          result.outBinds.new_allowance_type &&
          result.outBinds.new_allowance_type[0]) ||
        "",
      allowance_cit_flag:
        (result.outBinds &&
          result.outBinds.new_cit_flag &&
          result.outBinds.new_cit_flag[0]) ||
        "",

      salary_allowance_flag:
        (result.outBinds &&
          result.outBinds.new_salary_allowance_flag &&
          result.outBinds.new_salary_allowance_flag[0]) ||
        "",
      allowance_facility_percent:
        (result.outBinds &&
          result.outBinds.new_facility_percent &&
          result.outBinds.new_facility_percent[0]) ||
        "",

      allowance_acc_cd:
        (result.outBinds &&
          result.outBinds.new_acc_cd &&
          result.outBinds.new_acc_cd[0]) ||
        "",
      allowance_disabled:
        (result.outBinds &&
          result.outBinds.new_disabled &&
          result.outBinds.new_disabled[0]) ||
        "",
    };

    return {
      status: 201,
      message: "Allowance inserted successfully",
      data: insertedAllowance,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const getAllowances = async (): Promise<{
  status: number;
  message: string;
  allowance?: any;
}> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const sql = `SELECT * FROM allowance WHERE allowance_facility = 'A'`;
    const result = await connection.execute(sql);

    await connection.close();

    if (result.rows) {
      const rows: any[] = result.rows;

      const allowance = rows.map((row: any[]) => {
        return {
          allowance_CD: row[0],
          allowance_description: row[1],
          allowance_nepali_desc: row[2],
          allowance_taxable: row[3],
          allowance_facility: row[5],
          allowance_facility_percent: row[6],
          allowance_cit_flag: row[11],
          allowance_type: row[4],
          salary_allowance_flag: row[12],
          allowance_acc_cd: row[7],
          allowance_disabled: row[8],
          // order_sno: row[13],
          // is_pf_rf_as_salary: row[14],
          // ENTERED_BY: row[4],
          // ENTERED_DT: row[5],
          // SERVICE_EVENT_TYPE: row[6],
          // IS_AUTO_SALARY_ADJUST: row[7],
          // LAST_UPDATED_BY: row[8],
          // LAST_UPDATED_ON: row[9],
        };
      });

      return {
        status: 200,
        message: "allowance fetched successfully",
        allowance,
      };
    } else {
      return { status: 404, message: "Services not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const deleteAllowance = async (
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    const sql = `DELETE FROM allowance WHERE ALLOWANCE_CD = :id`;
    const result = await connection.execute(sql, {
      id: id,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "Allowance deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const updateAllowance = async (
  service: any,
  id: string
): Promise<{
  status: number;
  message: string;
}> => {
  try {
    const connection = await OracleDB.getConnection(oracleConfig);
    console.log("update service", service);
    // const
    // console.log("id", id);
    // const updatedOn = new Date().toISOString().slice(0, 10);

    const sql = `UPDATE allowance SET  ALLOWANCE_DESC = : ALLOWANCE_DESC, ALLOWANCE_DESC_NEP = :ALLOWANCE_DESC_NEP,  TAXABLE = : TAXABLE,  FACILITY_PERCENT = : FACILITY_PERCENT, CIT_FLAG = :CIT_FLAG, ALLOWANCE_TYPE = :ALLOWANCE_TYPE, ALLOWANCE_FACILITY = :ALLOWANCE_FACILITY ,  SALARY_ALLOWANCE_FLAG =  :SALARY_ALLOWANCE_FLAG,  ACC_CD = : ACC_CD,  DISABLED = : DISABLED WHERE ALLOWANCE_CD = :id`;
    const result = await connection.execute(sql, {
      ALLOWANCE_DESC: service.allowance_description,
      ALLOWANCE_DESC_NEP: service.allowance_nepali_desc,
      TAXABLE: service.allowance_taxable,
      FACILITY_PERCENT: service.allowance_facility_percent,
      CIT_FLAG: service.allowance_cit,
      ALLOWANCE_TYPE: service.allowance_type,
      ALLOWANCE_FACILITY: service.allowance_facility,
      SALARY_ALLOWANCE_FLAG: service.allowance_flag,
      ACC_CD: service.allowance_acc,
      DISABLED: service.allowance_disabled,
      id,
    });

    await connection.commit();
    await connection.close();

    return { status: 200, message: "Allowance updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};
