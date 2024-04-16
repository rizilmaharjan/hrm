import { connectToDB } from "../../../config/database";
import { formatDate } from "../helpers/formatDate";
import { TDistrict } from "../interfaces/types/district.types";

export const postDistrict = async (body: TDistrict) => {
  try {
    const connection = await connectToDB();
    const sql = `INSERT INTO DISTRICT (DISTRICT_CD, DISTRICT_DESC, DISTRICT_DESC_NEP, ZONE_CD) VALUES (:district_cd, :district_desc, :district_desc_nep, :zone_cd)`;
    const result = await connection.execute(sql, {
      district_cd: body.district_cd,
      district_desc: body.district_desc,
      district_desc_nep: body.district_desc_nep,
      zone_cd: body.zone_cd,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "District inserted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDistrict = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM DISTRICT`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const districts = rows.map((row: any[]) => {
        return {
          district_cd: row[1],
          district_desc: row[0],
          district_desc_nep: row[2],
          zone_cd: row[3],
        };
      });
      return {
        status: 200,
        message: "Districts fetched successfully",
        data: districts,
      };
    } else {
      return { status: 404, message: "Districts not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteDistrict = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM DISTRICT WHERE DISTRICT_CD = :id`;
    const result = await connection.execute(sql, { id });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "District deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateDistrict = async (id: string, data: TDistrict) => {
  try {
    const connection = await connectToDB();
    const sql = `UPDATE DISTRICT SET DISTRICT_DESC = :district_desc, DISTRICT_DESC_NEP = :district_desc_nep, ZONE_CD = :zone_cd WHERE DISTRICT_CD = :id`;
    const result = await connection.execute(sql, {
      id,
      district_desc: data.district_desc,
      district_desc_nep: data.district_desc_nep,
      zone_cd: data.zone_cd,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "District updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
