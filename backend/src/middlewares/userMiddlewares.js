const UserModels = require("../models/userModels");
const jwt_decode = require("jwt-decode");

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

const checkIfAdmin = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt_decode(token);
    const id = decoded.sub;
    const data = await userModels.findOneUser(id);
    const user = data[0][0];
    if (user.admin === 1) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, vous n'avez pas les droits administrateur`,
      });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const checkUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt_decode(token);
    const id = decoded.sub;
    const data = await userModels.findOneUser(id);
    const user = data[0][0];
    if (user.admin === 1 || user.id === Number(req.params.iduser)) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, vous n'avez pas les droits`,
      });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const emailValidity = (req, res, next) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const email = req.body.email;
  const check = regex.test(email);
  if (check) {
    next();
  } else {
    res.status(404).json({
      message: `Adresse mail invalide`,
    });
  }
};

module.exports = {
  newUser,
  recognizeUser,
  checkIfAdmin,
  checkUser,
  emailValidity,
};
