const userModels = require("../models/userModels");

const postUser = (req, res) => {
  const user = req.body;
  userModels
    .createUser(user)
    .then(() => {
      res.status(201).json({ message: "Votre compte a bien été créé" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Oups, le serveur est en panne");
    });
};

const logout = (req, res) => {
  res.clearCookie("appjwt").status(200).json({ message: "User logged out" });
};

const getAllUser = async (req, res) => {
  try {
    const [users] = await userModels.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Oups, le serveur est en panne 😅");
  }
};

const getOneUser = async (req, res) => {
  const { iduser } = req.params;
  try {
    const data = await userModels.findOneUser(iduser);
    const user = data[0][0];
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Désolé, le serveur est en panne" });
  }
};

const putOneUser = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.iduser, 10);
  userModels
    .updateUser(user)
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

const adminStatus = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.iduser, 10);
  userModels
    .updateAdmin(user)
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

const deleteOneUser = async (req, res, next) => {
  const { iduser } = req.params;
  try {
    const erase = await userModels.deleteUser(iduser);
    if (erase[0].affectedRows !== 0) {
      next();
    } else {
      res.status(404).json({
        message: `Désolé, il y a eu un problème lors de la suppression du user`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Désolé, le serveur est en panne+" });
  }
};

module.exports = {
  postUser,
  logout,
  getAllUser,
  getOneUser,
  putOneUser,
  adminStatus,
  deleteOneUser,
};
