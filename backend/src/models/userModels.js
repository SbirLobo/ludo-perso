const db = require("../database/config");

const createUser = (user) => {
  const SQL =
    "INSERT INTO user(userName, email, hashedPassword) VALUES (?, ?, ?)";
  return db.query(SQL, [user.userName, user.email, user.hashedPassword]);
};

const findAll = () => {
  const SQL = "SELECT id, userName, email, admin FROM user";
  return db.query(SQL);
};

const findByEmail = (user) => {
  const SQL = "SELECT * FROM user WHERE email = ?";
  return db.query(SQL, [user.email]);
};

const findOneUser = (id) => {
  const SQL = "SELECT id, userName, email, admin FROM user WHERE id = ?";
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
  findByEmail,
  findOneUser,
  updateUser,
  updateAdmin,
  deleteUser,
  createUser,
};
