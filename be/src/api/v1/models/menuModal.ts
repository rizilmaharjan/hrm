import { connectToDB } from "../../../config/database";

export const getMenu = async () => {
  try {
    const connection = await connectToDB();
    const sql = `SELECT * FROM secu_menu_control_mst order by menu_cd`;
    const result = await connection.execute(sql);
    await connection.close();
    if (result.rows) {
      const rows: any[] = result.rows;
      const menu = rows.map((row: any[]) => {
        return {
          insert_allowed: row[0],
          menu_cd: row[1],
          group_name: row[2],
          menu_type: row[3],
          design_menu_name: row[4],
          open_allowed: row[5],
          menu_desc: row[6],
          query_allowed: row[8],
          delete_allowed: row[9],
          update_allowed: row[10],
          form_name: row[11],
        };
      });
      return {
        status: 200,
        message: "Menu fetched successfully",
        data: menu,
      };
    } else {
      return { status: 404, message: "Menu not found" };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
