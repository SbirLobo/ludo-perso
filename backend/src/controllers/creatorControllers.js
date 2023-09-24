const creatorModels = require("../models/creatorModels");

const getAllCreators = async (req, res) => {
  try {
    const [users] = await creatorModels.findAllCreators();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

const postCreator = (req, res) => {
  const data = req.body;
  creatorModels
    .createCreator(data)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouvel auteur dans la database");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne !" });
    });
};

const putCreator = (req, res) => {
  const data = req.body;
  data.id = parseInt(req.params.id, 10);
  creatorModels
    .updateCreator(data)
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

const deleteCreator = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await creatorModels.destroyCreator(id);
    if (erase[0].affectedRows === 1) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ce créateur sur l'étape 'delete creator'`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  getAllCreators,
  postCreator,
  putCreator,
  deleteCreator,
};
