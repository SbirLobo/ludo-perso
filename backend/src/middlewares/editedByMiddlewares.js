const editedByModels = require("../models/editedByModels");

const deleteEditedBoardgame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await editedByModels.destroyEditedBoardgame(id);
    if (erase[0].affectedRows !== 0) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de ce boardgame sur l'étape 'edited by'`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  deleteEditedBoardgame,
};
