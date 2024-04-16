import { connectToDB } from "../../../config/database";
import { formatDate } from "../helpers/formatDate";
import { TRelation } from "../interfaces/types/relation.types";

export const postRelation = async (body: TRelation) => {
  try {
    const connection = await connectToDB();
    console.log(body);
    const sql = `INSERT INTO RELATION (RELATION_CD, RELATION_DESC, RELATION_DESC_NEP, DISABLED, ENTERED_BY, ENTERED_DT) VALUES (:relation_cd, :relation_desc, :relation_desc_nep, :disabled, :entered_by, TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS'))`;
    const result = await connection.execute(sql, {
      relation_cd: body.relation_cd,
      relation_desc: body.relation_desc,
      relation_desc_nep: body.relation_desc_nep,
      disabled: body.disabled,
      entered_by: body.entered_by,
      entered_dt: formatDate(),
    });
    await connection.commit();
    await connection.close();
    return { status: 201, message: "Relation inserted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRelation = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM RELATION`;
    const result = await connection.execute(sql);
    if (result.rows) {
      const rows: any[] = result.rows;
      const relations = rows.map((row: any[]) => {
        return {
          relation_cd: row[0],
          relation_desc: row[1],
          relation_desc_nep: row[2],
          disabled: row[3],
          entered_by: row[4],
          entered_dt: row[5],
        };
      });
      return {
        status: 200,
        message: "Relation fetched successfully",
        data: relations,
      };
    } else {
      return { status: 404, message: "Relation not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRelation = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM RELATION WHERE RELATION_CD = :id`;
    const result = await connection.execute(sql, { id });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Relation deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRelation = async (id: string, body: TRelation) => {
  try {
    const connection = await connectToDB();
    console.log(id, body);
    const sql = `UPDATE RELATION SET RELATION_DESC = :relation_desc, RELATION_DESC_NEP = :relation_desc_nep, DISABLED = :disabled, ENTERED_BY = :entered_by, ENTERED_DT = TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS') WHERE RELATION_CD = :id`;
    const result = await connection.execute(sql, {
      relation_desc: body.relation_desc,
      relation_desc_nep: body.relation_desc_nep,
      disabled: body.disabled,
      entered_by: body.entered_by,
      entered_dt: formatDate(),
      id,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Relation updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
