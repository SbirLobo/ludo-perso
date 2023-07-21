const db = require("../database/config");

const FKOFF = () => {
  const SQL = "SET FOREIGN_KEY_CHECKS=0";
  return db.query(SQL);
};

const FKON = () => {
  const SQL = "SET FOREIGN_KEY_CHECKS=1";
  return db.query(SQL);
};

module.exports = {
  FKOFF,
  FKON,
};
