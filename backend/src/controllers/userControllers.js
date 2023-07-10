const userModels = require("../models/userModels");

const getAllUser = async (req, res) => {
  try {
    const [users] = await userModels.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Oups, le serveur est en panne 😅");
  }
};

module.exports = {
  getAllUser,
};
