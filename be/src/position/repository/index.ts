import { connectToDB } from "../../config/database";
import { TPosition } from "../../types";
import { formatDate } from "../../utils";

export const postPosition = async (body: TPosition) => {
  const {
    position_cd,
    position_desc,
    position_desc_nep,
    upper_position_cd,
    group_flag,
    disabled,
    entered_by,
    order_no,
    computer_position_cd,
    new_position_cd,
  } = body;
  const entered_dt = formatDate();
  console.log({ body, entered_dt });
  try {
    const connection = await connectToDB();
    const sql = `INSERT INTO position (POSITION_CD, POSITION_DESC, POSITION_DESC_NEP, UPPER_POSITION_CD, GROUP_FLAG, DISABLED, ENTERED_BY, ENTERED_DT, ORDER_NO, COMPUTER_POSITION_CD, NEW_POSITION_CD) VALUES (:position_cd, :position_desc, :position_desc_nep, :upper_position_cd, :group_flag, :disabled, :entered_by, TO_DATE(:entered_dt, 'YYYY-MM-DD HH24:MI:SS'), :order_no, :computer_position_cd, :new_position_cd)`;
    const result = await connection.execute(sql, {
      position_cd,
      position_desc,
      position_desc_nep,
      upper_position_cd,
      group_flag,
      disabled,
      entered_by,
      entered_dt,
      order_no,
      computer_position_cd,
      new_position_cd,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Position inserted successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getPosition = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM position`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const positions = rows.map((row: any[]) => {
        return {
          position_cd: row[0],
          position_desc: row[1],
          position_desc_nep: row[2],
          upper_position_cd: row[3],
          group_flag: row[4],
          disabled: row[5],
          entered_by: row[6],
          entered_dt: row[7],
          order_no: row[8],
          computer_position_cd: row[9],
          new_position_cd: row[10],
        };
      });
      return {
        status: 200,
        message: "Positions fetched successfully",
        data: positions,
      };
    } else {
      return { status: 404, message: "Positions not found" };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const updatePosition = async (id: string, data: TPosition) => {
  try {
    const connection = await connectToDB();
    console.log("ID:", id, "Body:", data);
    const sql = `UPDATE position SET position_desc = :position_desc, position_desc_nep = :position_desc_nep, upper_position_cd = :upper_position_cd, group_flag = :group_flag, disabled = :disabled, order_no = :order_no, computer_position_cd = :computer_position_cd, new_position_cd = :new_position_cd WHERE position_cd = :id`;
    const result = await connection.execute(sql, {
      position_desc: data.position_desc,
      position_desc_nep: data.position_desc_nep,
      upper_position_cd: data.upper_position_cd,
      group_flag: data.group_flag,
      disabled: data.disabled,
      order_no: data.order_no,
      computer_position_cd: data.computer_position_cd,
      new_position_cd: data.new_position_cd,
      id,
    });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Position updated successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const deletePosition = async (id: string) => {
  try {
    const connection = await connectToDB();
    const sql = `DELETE FROM position WHERE position_cd = :id`;
    const result = await connection.execute(sql, { id });
    await connection.commit();
    await connection.close();
    return { status: 200, message: "Position deleted successfully" };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
