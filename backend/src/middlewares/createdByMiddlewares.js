const createdByModels = require("../models/createdByModels");

const deleteCreatedBoardgame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await createdByModels.destroyCreatedBoardgame(id);
    if (erase[0].affectedRows !== 0) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ce boardgame sur l'étape 'created by'`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  deleteCreatedBoardgame,
};
