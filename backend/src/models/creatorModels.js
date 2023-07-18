const db = require("../database/config");

const findAllCreators = () => {
  const SQL = "SELECT * FROM creator";
  return db.query(SQL);
};

const createCreator = (data) => {
  const SQL = "INSERT INTO creator (firstname,lastname) VALUES (?,?)";
  return db.query(SQL, [data.firstname, data.lastname]);
};

const updateCreator = (data) => {
  const SQL = "UPDATE creator SET firstname = ?,lastname = ? WHERE id = ?";
  return db.query(SQL, [data.firstname, data.lastname, data.id]);
};

module.exports = {
  findAllCreators,
  createCreator,
  updateCreator,
};
