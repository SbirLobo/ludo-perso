const express = require("express");
const router = express.Router();
const userControllers = require("./controllers/userControllers");
const ownedByControllers = require("./controllers/ownedByControllers");
const {
  foreignKeyOFF,
  foreignKeyON,
} = require("./middlewares/ForeignKeyMiddleware");

router.get("/", (req, res) => {
  res.send("Welcome Home");
});

// *
// Routes de la table User
// *

router.get("/users", userControllers.getAllUser);
router.get("/users/:id", userControllers.getOneUser);
router.put("/users/:id", userControllers.putOneUser);
router.put("/users/admin/:id", userControllers.adminStatus);
router.delete(
  "/users/:id",
  foreignKeyOFF,
  userControllers.deleteOneUser,
  ownedByControllers.deleteUser,
  foreignKeyON
);

module.exports = router;
