const db = require("../database/config");

const destroyEditedBoardgame = (id) => {
  const SQL = "DELETE FROM edited_by WHERE boardgame_id = ?";
  return db.query(SQL, [id]);
};

const findAllEditorBoardgames = (id) => {
  const SQL =
    "SELECT e.editor_id, e.boardgame_id, b.title, b.nbPlayer, b.playingTime, b.standalone, b.year, b.language, b.boxImg FROM edited_by AS e INNER JOIN boardgame AS b ON b.id = e.boardgame_id WHERE e.editor_id = ?";
  return db.query(SQL, [id]);
};

const addEditedByBoardgame = (ideditor, idboardgame) => {
  const SQL = "INSERT INTO edited_by (editor_id, boardgame_id) VALUES (?,?)";
  return db.query(SQL, [ideditor, idboardgame]);
};

const destroyEditedByBoardgame = (ideditor, idboardgame) => {
  const SQL = "DELETE FROM edited_by WHERE editor_id=? AND boardgame_id=?";
  return db.query(SQL, [ideditor, idboardgame]);
};

const findAllBoardgameEditors = (id) => {
  const SQL =
    "SELECT e.id, e.name, b.title FROM edited_by AS eb INNER JOIN boardgame AS b ON b.id = eb.boardgame_id INNER JOIN editor AS e ON e.id = eb.editor_id WHERE b.id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  destroyEditedBoardgame,
  findAllEditorBoardgames,
  addEditedByBoardgame,
  destroyEditedByBoardgame,
  findAllBoardgameEditors,
};
