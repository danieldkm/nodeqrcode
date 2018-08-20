module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "MAINIFL",
  password      : process.env.NODE_ORACLEDB_PASSWORD || "A1M7J2CT",
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "SRVORA/IFLP",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};