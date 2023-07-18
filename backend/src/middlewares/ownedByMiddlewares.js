const ownedByModels = require("../models/ownedByModels");

const checkIfOwned = (req, res, next) => {
  const { iduser, idboardgame } = req.params;
  ownedByModels
    .findOneUserBoardame(iduser, idboardgame)
    .then((bg) => {
      console.log(bg[0].length);
      if (bg[0].length > 0) {
        res.json("Ce boardgame est déjà dans la collection.");
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteOwnedBoardgameByAnyUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await ownedByModels.destroyBoardgameOwnedByAnyUser(id);
    if (erase[0].affectedRows !== 0) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ce boardgame`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  checkIfOwned,
  deleteOwnedBoardgameByAnyUser,
};
