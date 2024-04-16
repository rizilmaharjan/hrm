import { connectToDB } from "../../../config/database";
import { formatDate } from "../helpers/formatDate";
import { TReligion } from "../interfaces/types/religion.types";

export const postReligion = async (body: TReligion) => {
  try {
    const connection = await connectToDB();
    const entered_dt = formatDate();
    const sql = `INSERT INTO religion (religion_cd, religion_desc, religion_desc_nep, disabled, entered_by, entered_dt) VALUES (:religion_cd, :religion_desc, :religion_desc_nep, :disabled, :entered_by, TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS'))`;
    const result = await connection.execute(sql, {
      religion_cd: body.religion_cd,
      religion_desc: body.religion_desc,
      religion_desc_nep: body.religion_desc_nep,
      disabled: body.disabled,
      entered_by: body.entered_by,
      entered_dt,
    });
    await connection.commit();
    await connection.close();
    return { status: 201, message: "Religion inserted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReligion = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM religion`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const religions = rows.map((row: any[]) => {
        return {
          religion_cd: row[0],
          religion_desc: row[1],
          religion_desc_nep: row[2],
          disabled: row[3],
          entered_by: row[4],
          entered_dt: row[5],
        };
      });
      return {
        status: 200,
        message: "Religion fetched successfully",
        data: religions,
      };
    } else {
      return { status: 404, message: "Religion not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteReligion = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM religion WHERE religion_cd = :id`;
    const result = await connection.execute(sql, { id });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Religion deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateReligion = async (id: string, body: TReligion) => {
  try {
    const connection = await connectToDB();
    const sql = `UPDATE religion SET religion_desc = :religion_desc, religion_desc_nep = :religion_desc_nep, disabled = :disabled, entered_by = :entered_by, entered_dt = TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS') WHERE religion_cd = :id`;
    const result = await connection.execute(sql, {
      id,
      religion_desc: body.religion_desc,
      religion_desc_nep: body.religion_desc_nep,
      disabled: body.disabled,
      entered_by: body.entered_by,
      entered_dt: formatDate(),
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Religion updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
