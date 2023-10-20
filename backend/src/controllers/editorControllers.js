const editorModels = require("../models/editorModels");

const getAllEditors = async (req, res) => {
  try {
    const [users] = await editorModels.findAllEditors();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

const postEditor = (req, res) => {
  const data = req.body;
  editorModels
    .createEditor(data)
    .then((adding) => {
      if (adding.affectedRows === 0) {
        res.status(404).json("error");
      } else {
        res.status(201).json("Nouvel éditeur dans la database");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Désolé, le serveur est en panne" });
    });
};

const putEditor = (req, res) => {
  const data = req.body;
  data.id = parseInt(req.params.id, 10);
  editorModels
    .updateEditor(data)
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

const deleteEditor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const erase = await editorModels.destroyEditor(id);
    if (erase[0].affectedRows === 1) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression de cet éditeur sur l'étape 'delete editor'`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

module.exports = {
  getAllEditors,
  postEditor,
  putEditor,
  deleteEditor,
};
