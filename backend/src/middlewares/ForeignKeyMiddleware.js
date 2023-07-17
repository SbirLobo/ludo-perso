const ForeignKeyModels = require("../models/ForeignKeyModels");

const foreignKeyOFF = (req, res, next) => {
  ForeignKeyModels.FKOFF()
    .then(next())
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const foreignKeyON = (req, res) => {
  ForeignKeyModels.FKON()
    .then(
      res.status(200).json({
        message: "La cible a bien été supprimée",
      })
    )
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  foreignKeyOFF,
  foreignKeyON,
};
