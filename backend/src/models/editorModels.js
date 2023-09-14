const db = require("../database/config");

const findAllEditors = () => {
  const SQL = "SELECT * FROM editor ORDER BY name";
  return db.query(SQL);
};

const createEditor = (data) => {
  const SQL = "INSERT INTO editor (name) VALUES (?)";
  return db.query(SQL, [data.name]);
};

const updateEditor = (data) => {
  const SQL = "UPDATE editor SET name = ? WHERE id = ?";
  return db.query(SQL, [data.name, data.id]);
};

module.exports = {
  findAllEditors,
  createEditor,
  updateEditor,
};
