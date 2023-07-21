const boardgameModels = require("../models/boardgameModels");

const getAllBoardgames = async (req, res) => {
  try {
    const [users] = await boardgameModels.findAllBoardgames();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Oups, le serveur est en panne 😅");
  }
};

const postBoardgame = (req, res) => {
  const data = req.body;
  boardgameModels
    .createBoardgame(data)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouveau boardgame dans la database");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const putBoardgame = (req, res) => {
  const data = req.body;
  data.id = parseInt(req.params.id, 10);
  boardgameModels
    .updateBoardgame(data)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Oups, le serveur est en panne");
    });
};

const deleteBoardgame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await boardgameModels.destroyBoardgame(id);
    if (erase[0].affectedRows === 1) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ce boardgame sur l'étape 'delete boardgame'`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  getAllBoardgames,
  postBoardgame,
  putBoardgame,
  deleteBoardgame,
};
