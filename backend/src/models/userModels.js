const db = require("../database/config");

const findAll = () => {
  const SQL = "SELECT * FROM user";
  return db.query(SQL);
};

const findOneUser = (id) => {
  const SQL = "SELECT id, userName, email FROM user WHERE id = ?";
  return db.query(SQL, [id]);
};

const updateUser = (user) => {
  const SQL = "UPDATE user SET userName = ?, email = ? WHERE id = ?";
  return db.query(SQL, [user.userName, user.email, user.id]);
};

const updateAdmin = (user) => {
  const SQL = "UPDATE user SET admin = ? WHERE id = ?";
  return db.query(SQL, [user.admin, user.id]);
};

const deleteUser = (id) => {
  const SQL = "DELETE FROM user WHERE admin != 1 AND id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  findAll,
  findOneUser,
  updateUser,
  updateAdmin,
  deleteUser,
};
