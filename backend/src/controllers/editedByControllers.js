const editedByModels = require("../models/editedByModels");

const getAllEditorBoardgame = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await editedByModels.findAllEditorBoardgames(id);
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

const postEditedByBoardgame = (req, res) => {
  const { ideditor, idboardgame } = req.params;
  editedByModels
    .addEditedByBoardgame(ideditor, idboardgame)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouveau boardgame chez l'éditeur");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const deleteEditedByBoardgame = (req, res) => {
  const { ideditor, idboardgame } = req.params;
  editedByModels
    .destroyEditedByBoardgame(ideditor, idboardgame)
    .then((del) => {
      if (del.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Le boardgame a été retiré de chez cet éditeur");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

module.exports = {
  getAllEditorBoardgame,
  postEditedByBoardgame,
  deleteEditedByBoardgame,
};
