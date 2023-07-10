const db = require("../database/config");

const findAll = () => {
  const SQL = "SELECT * FROM user";
  return db.query(SQL);
};

module.exports = {
  findAll,
};
