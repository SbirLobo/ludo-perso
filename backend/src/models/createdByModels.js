const db = require("../database/config");

const destroyCreatedBoardgame = (id) => {
  const SQL = "DELETE FROM created_by WHERE boardgame_id = ?";
  return db.query(SQL, [id]);
};

const findAllCreatorBoardgames = (id) => {
  const SQL =
    "SELECT c.creator_id, c.boardgame_id AS id, b.title, b.nbPlayer, b.playingTime, b.standalone, b.year, b.language, b.boxImg FROM created_by AS c INNER JOIN boardgame AS b ON b.id = c.boardgame_id WHERE c.creator_id = ?";
  return db.query(SQL, [id]);
};

const addCreatedByBoardgame = (idcreator, idboardgame) => {
  const SQL = "INSERT INTO created_by (creator_id, boardgame_id) VALUES (?,?)";
  return db.query(SQL, [idcreator, idboardgame]);
};

const destroyCreatedByBoardgame = (idcreator, idboardgame) => {
  const SQL = "DELETE FROM created_by WHERE creator_id=? AND boardgame_id=?";
  return db.query(SQL, [idcreator, idboardgame]);
};

const findAllBoardgameCreators = (id) => {
  const SQL =
    "SELECT c.id, c.firstname, c.lastname, b.title FROM created_by AS cb INNER JOIN boardgame AS b ON b.id = cb.boardgame_id INNER JOIN creator AS c ON c.id = cb.creator_id WHERE b.id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  destroyCreatedBoardgame,
  findAllCreatorBoardgames,
  addCreatedByBoardgame,
  destroyCreatedByBoardgame,
  findAllBoardgameCreators,
};
