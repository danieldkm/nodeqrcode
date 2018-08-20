module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "USUARIO",
  password      : process.env.NODE_ORACLEDB_PASSWORD || "SENHA",
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "SRVORA/IFLP",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};