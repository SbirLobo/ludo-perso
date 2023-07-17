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

module.exports = {
  deleteUser,
};
