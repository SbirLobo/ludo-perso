const db = require("../database/config");

const findAllBoardgames = () => {
  const SQL = "SELECT * FROM boardgame";
  return db.query(SQL);
};

const findOneBoardgames = (id) => {
  const SQL = "SELECT * FROM boardgame WHERE id=?";
  return db.query(SQL, [id]);
};

const createBoardgame = (data) => {
  const SQL =
    "INSERT INTO boardgame (title,nbPlayer,playingTime,standalone,year,language,boxImg) VALUES (?,?,?,?,?,?,?)";
  return db.query(SQL, [
    data.title,
    data.nbPlayer,
    data.playingTime,
    data.standalone,
    data.year,
    data.language,
    data.boxImg,
  ]);
};

const updateBoardgame = (data) => {
  const SQL =
    "UPDATE boardgame SET title = ?,nbPlayer = ?,playingTime = ?,standalone = ?,year = ?,language = ?,boxImg = ? WHERE id = ?";
  return db.query(SQL, [
    data.title,
    data.nbPlayer,
    data.playingTime,
    data.standalone,
    data.year,
    data.language,
    data.boxImg,
    data.id,
  ]);
};

const destroyBoardgame = (id) => {
  const SQL = "DELETE FROM boardgame WHERE id = ?";
  return db.query(SQL, [id]);
};

module.exports = {
  findAllBoardgames,
  findOneBoardgames,
  createBoardgame,
  updateBoardgame,
  destroyBoardgame,
};
