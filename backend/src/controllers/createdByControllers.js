const createdByModels = require("../models/createdByModels");

const getAllCreatorBoardgame = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await createdByModels.findAllCreatorBoardgames(id);
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

const postCreatedByBoardgame = (req, res) => {
  const { idcreator, idboardgame } = req.params;
  createdByModels
    .addCreatedByBoardgame(idcreator, idboardgame)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouveau boardgame chez l'auteur'");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const deleteCreatedByBoardgame = (req, res) => {
  const { idcreator, idboardgame } = req.params;
  createdByModels
    .destroyCreatedByBoardgame(idcreator, idboardgame)
    .then((del) => {
      if (del.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Le boardgame a été retiré de chez cet auteur");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

module.exports = {
  getAllCreatorBoardgame,
  postCreatedByBoardgame,
  deleteCreatedByBoardgame,
};
