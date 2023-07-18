const ownedByModels = require("../models/ownedByModels");

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await ownedByModels.deleteOwnedByUser(id);
    if (erase[0].affectedRows !== 0) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ${erase.userName}`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne++" });
  }
};

const getAllUserBoardgames = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ownedByModels.findAllUserBoardgames(id);
    const boardgames = data[0];
    if (boardgames == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(boardgames);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

const postOwnedBoardgame = (req, res) => {
  const { iduser, idboardgame } = req.params;
  ownedByModels
    .addBoardgame(iduser, idboardgame)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouveau boardgame dans la collection");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const deleteOwnedBoardgame = (req, res) => {
  const { iduser, idboardgame } = req.params;
  ownedByModels
    .destroyBoardgame(iduser, idboardgame)
    .then((del) => {
      if (del.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Le boardgame a été retiré de la collection");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const updateOwnedBoardgame = (req, res) => {
  const { iduser, idboardgame } = req.params;
  const { favorite } = req.body;
  ownedByModels
    .putBoardgame(favorite, iduser, idboardgame)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Le boardgame a été modifié");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

module.exports = {
  deleteUser,
  getAllUserBoardgames,
  postOwnedBoardgame,
  deleteOwnedBoardgame,
  updateOwnedBoardgame,
};
