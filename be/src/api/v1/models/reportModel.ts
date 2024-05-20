import { connectToDB } from "../../../config/database";

export const getFiscalYr = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT fiscal_yr, status FROM FISCAL_YEAR`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const fiscalYr = rows.map((row: any[]) => {
        return {
          fiscal_yr: row[0],
          status: row[1],
        };
      });
      return {
        status: 200,
        message: "Fiscal Year fetched successfully",
        data: fiscalYr,
      };
    } else {
      return { status: 404, message: "Data not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPayMonth = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT month_no, month_cd, pay_month_desc FROM PAY_MONTH`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const payMonth = rows.map((row: any[]) => {
        return {
          month_no: row[0],
          month_cd: row[1],
          pay_month_desc: row[2],
        };
      });
      return {
        status: 200,
        message: "Pay Month fetched successfully",
        data: payMonth,
      };
    } else {
      return { status: 404, message: "Data not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getVoucherNo = async (
  fiscal_yr: string,
  process_month?: string
) => {
  try {
    const connection = await connectToDB();
    let sql;
    if (process_month) {
      sql = `SELECT pay_vch_no FROM pay_tran_mst WHERE fiscal_yr = '${fiscal_yr}' AND process_month = '${process_month}'`;
    } else {
      sql = `SELECT pay_vch_no FROM pay_tran_mst WHERE fiscal_yr = '${fiscal_yr}'`;
    }
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const voucherNo = rows.map((row: any[]) => {
        return {
          pay_vch_no: row[0],
        };
      });
      return {
        status: 200,
        message: "Voucher No fetched successfully",
        data: voucherNo,
      };
    } else {
      return { status: 404, message: "Data not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOffice = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT office_cd, office_desc FROM office_mst`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const office = rows.map((row: any[]) => {
        return {
          office_cd: row[0],
          office_desc: row[1],
        };
      });
      return {
        status: 200,
        message: "Office fetched successfully",
        data: office,
      };
    } else {
      return { status: 404, message: "Data not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
