import oracledb from "oracledb";
//Local database configuration
// const dbConfigure: oracledb.ConnectionAttributes = {
//   user: "system",
//   password: "root",
//   connectString: "localhost:1521/XEPDB1",
// };

// Remote database configuration
const dbConfigure: oracledb.ConnectionAttributes = {
  user: "cpay",
  password: "c",
  connectString: "192.168.10.219:1521/ORCL",
};

export async function connectToDB() {
  try {
    const connection = await oracledb.getConnection(dbConfigure);
    console.log("Connected to Oracle Database");
    return connection;
  } catch (error) {
    console.error("Error connecting to Oracle Database: ", error);
    throw error;
  }
}
