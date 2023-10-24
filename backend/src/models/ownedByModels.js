const db = require("../database/config");

const deleteOwnedByUser = (iduser) => {
  const SQL = "DELETE FROM owned_by WHERE user_id = ?";
  return db.query(SQL, [iduser]);
};

const findAllUserBoardgames = (iduser) => {
  const SQL =
    "SELECT o.user_id, o.boardgame_id, o.favorite, b.title, b.nbPlayer, b.playingTime, b.standalone, b.year, b.language, b.boxImg FROM owned_by AS o INNER JOIN boardgame AS b ON b.id = o.boardgame_id WHERE o.user_id = ?";
  return db.query(SQL, [iduser]);
};

const addBoardgame = (iduser, idboardgame) => {
  const SQL = "INSERT INTO owned_by (user_id, boardgame_id) VALUES (?,?)";
  return db.query(SQL, [iduser, idboardgame]);
};

const findOneUserBoardame = (iduser, idboardgame) => {
  const SQL = "SELECT * FROM owned_by WHERE user_id=? AND boardgame_id=?";
  return db.query(SQL, [iduser, idboardgame]);
};

const destroyBoardgame = (iduser, idboardgame) => {
  const SQL = "DELETE FROM owned_by WHERE user_id=? AND boardgame_id=?";
  return db.query(SQL, [iduser, idboardgame]);
};

const putBoardgame = (favorite, iduser, idboardgame) => {
  const SQL =
    "UPDATE owned_by SET favorite = ? WHERE user_id=? AND boardgame_id=?";
  return db.query(SQL, [favorite, iduser, idboardgame]);
};

const destroyBoardgameOwnedByAnyUser = (id) => {
  const SQL = "DELETE FROM owned_by WHERE boardgame_id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  deleteOwnedByUser,
  findAllUserBoardgames,
  addBoardgame,
  findOneUserBoardame,
  destroyBoardgame,
  putBoardgame,
  destroyBoardgameOwnedByAnyUser,
};
