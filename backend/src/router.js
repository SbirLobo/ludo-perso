const express = require("express");
const router = express.Router();
const userControllers = require("./controllers/userControllers");

router.get("/", (req, res) => {
  res.send("Welcome Home");
});

router.get("/users", userControllers.getAllUser);

module.exports = router;
