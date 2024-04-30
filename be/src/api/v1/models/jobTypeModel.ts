import { connectToDB } from "../../../config/database";
import { TJobType } from "../interfaces/types/jobtype.types";
import { formatDate } from "../helpers/formatDate";
export const postJobType = async (body: TJobType) => {
  const {
    job_type_cd,
    job_type_desc,
    tax,
    pf_allowed,
    cit,
    disabled,
    entered_by,
    pay_generate,
    tax_percent,
    single_rebate,
    married_rebate,
    grade_allowed,
    is_job_expire_date,
    job_expire_months,
    is_social_security_fund,
    job_type_group,
  } = body;
  const entered_dt = formatDate();
  // console.log("Repository data:", data, entered_dt);
  try {
    const connection = await connectToDB();
    const sql = `INSERT INTO job_type (JOB_TYPE_CD, JOB_TYPE_DESC, TAX, PF_ALLOWED, CIT, DISABLED, ENTERED_BY, ENTERED_DT, PAY_GENERATE, TAX_PERCENT, SINGLE_REBATE, MARRIED_REBATE, GRADE_ALLOWED, IS_JOB_EXPIRE_DATE, JOB_EXPIRE_MONTHS, IS_SOCIAL_SECURITY_FUND, JOB_TYPE_GROUP) VALUES (:job_type_cd, :job_type_desc, :tax, :pf_allowed, :cit, :disabled, :entered_by, TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS'), :pay_generate, :tax_percent, :single_rebate, :married_rebate, :grade_allowed, :is_job_expire_date, :job_expire_months, :is_social_security_fund, :job_type_group)`;
    const result = await connection.execute(sql, {
      job_type_cd,
      job_type_desc,
      tax,
      pf_allowed,
      cit,
      disabled,
      entered_by,
      entered_dt,
      pay_generate,
      tax_percent,
      single_rebate,
      married_rebate,
      grade_allowed,
      is_job_expire_date,
      job_expire_months,
      is_social_security_fund,
      job_type_group,
    });
    await connection.commit();
    await connection.close();
    return {
      status: 201,
      message: "Job Type inserted successfully",
      data: result.rows,
    };
  } catch (error: any) {
    if (error.message.includes("ORA-00001")) {
      return { status: 400, message: "Record with this ID already exists" };
    } else {
      throw new Error(error.message);
    }
    // return { status: 500, message: error.message };
  }
};

export const getJobType = async (search?: string) => {
  try {
    const connection = await connectToDB();
    let sql = `SELECT * FROM job_type`;
    if (search) {
      // Add WHERE clause to filter based on search term
      sql += ` WHERE UPPER(JOB_TYPE_DESC) LIKE UPPER('%${search}%')`;
    }

    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const jobTypes = rows.map((row: any[]) => {
        return {
          job_type_cd: row[0],
          job_type_desc: row[1],
          tax: row[2],
          pf_allowed: row[3],
          cit: row[4],
          disabled: row[5],
          entered_by: row[6],
          pay_generate: row[8],
          tax_percent: row[9],
          single_rebate: row[10],
          married_rebate: row[11],
          grade_allowed: row[12],
          //   is_job_expired_date: row[12],
          //   job_expire_months: row[13],
          //   is_social_security_fund: row[14],
          //   job_type_group: row[15],
        };
      });
      return {
        status: 200,
        message: "JobType fetched successfully",
        data: jobTypes,
      };
    } else {
      return { status: 404, message: "No JobType found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: error.message };
  }
};

export const deleteJobType = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM job_type WHERE JOB_TYPE_CD = :job_type_cd`;
    const result = await connection.execute(sql, { job_type_cd: id });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Job Type deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};

export const updateJobType = async (id: string, data: TJobType) => {
  try {
    const connection = await connectToDB();
    console.log("ID:", id, "data:", data);
    const sql = `UPDATE job_type SET JOB_TYPE_DESC = :job_type_desc, TAX = :tax, PF_ALLOWED = :pf_allowed, CIT = :cit, DISABLED = :disabled, PAY_GENERATE = :pay_generate, TAX_PERCENT = :tax_percent, SINGLE_REBATE = :single_rebate, MARRIED_REBATE = :married_rebate, GRADE_ALLOWED = :grade_allowed WHERE JOB_TYPE_CD = :id`;
    const result = await connection.execute(sql, {
      job_type_desc: data.job_type_desc,
      tax: data.tax,
      pf_allowed: data.pf_allowed,
      cit: data.cit,
      disabled: data.disabled,
      id,
      pay_generate: data.pay_generate,
      tax_percent: data.tax_percent,
      single_rebate: data.single_rebate,
      married_rebate: data.married_rebate,
      grade_allowed: data.grade_allowed,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Job Type updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);

    // return { status: 500, message: error.message };
  }
};
