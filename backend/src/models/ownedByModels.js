const db = require("../database/config");

const deleteOwnedByUser = (id) => {
  const SQL = "DELETE FROM owned_by WHERE user_id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  deleteOwnedByUser,
};
