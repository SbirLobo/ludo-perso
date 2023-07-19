const UserModels = require("../models/userModels");

const newUser = (req, res, next) => {
  UserModels.findByEmail(req.body)
    .then(([rows]) => {
      if (rows.length > 0) {
        res.json("L'utilisateur existe déjà");
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const recognizeUser = (req, res, next) => {
  UserModels.findByEmail(req.body)
    .then(([user]) => {
      if (user[0] != null) {
        [req.user] = user;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  newUser,
  recognizeUser,
};
