const express = require("express");
const router = express.Router();
const userControllers = require("./controllers/userControllers");
const ownedByControllers = require("./controllers/ownedByControllers");
const boardgameControllers = require("./controllers/boardgameControllers");
const editorControllers = require("./controllers/editorControllers");
const creatorControllers = require("./controllers/creatorControllers");
const editedByControllers = require("./controllers/editedByControllers");
const createdByControllers = require("./controllers/createdByControllers");
const {
  hashPassword,
  verifyPassword,
} = require("./controllers/authControllers");

const ownedByMiddlewares = require("./middlewares/ownedByMiddlewares");
const editedByMiddlewares = require("./middlewares/editedByMiddlewares");
const createdByMiddlewares = require("./middlewares/createdByMiddlewares");
const {
  foreignKeyOFF,
  foreignKeyON,
} = require("./middlewares/ForeignKeyMiddleware");
const { newUser, recognizeUser } = require("./middlewares/userMiddlewares");

router.get("/", (req, res) => {
  res.send("Welcome Home");
});

// *
// Routes login et logout
// *

router.post("/login", recognizeUser, verifyPassword);
router.get("/logout", userControllers.logout);
router.post("/inscription", newUser, hashPassword, userControllers.postUser);

// *
// Routes de la table user
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

// *
// Routes de la table owned_by
// *

router.get("/user/owned/:id", ownedByControllers.getAllUserBoardgames);
router.post(
  "/user/owned/:iduser/:idboardgame",
  ownedByMiddlewares.checkIfOwned,
  ownedByControllers.postOwnedBoardgame
);
router.delete(
  "/user/owned/:iduser/:idboardgame",
  ownedByControllers.deleteOwnedBoardgame
);
router.put(
  "/user/owned/:iduser/:idboardgame",
  ownedByControllers.updateOwnedBoardgame
);

// *
// Routes de la table boardgame
// *

router.get("/boardgames", boardgameControllers.getAllBoardgames);
router.post("/boardgames", boardgameControllers.postBoardgame);
router.put("/boardgames/:id", boardgameControllers.putBoardgame);
router.delete(
  "/boardgames/:id",
  foreignKeyOFF,
  // ownedByMiddlewares.deleteOwnedBoardgameByAnyUser,
  // editedByMiddlewares.deleteEditedBoardgame,
  // createdByMiddlewares.deleteCreatedBoardgame,
  boardgameControllers.deleteBoardgame,
  foreignKeyON
);

// *
// Routes de la table edited_by
// *

router.get("/editedBy/:id", editedByControllers.getAllEditorBoardgame);
router.post(
  "/editedBy/creation/:ideditor/:idboardgame",
  editedByControllers.postEditedByBoardgame
);
router.delete(
  "/editedBy/delete/:ideditor/:idboardgame",
  editedByControllers.deleteEditedByBoardgame
);

// *
// Routes de la table created_by
// *

router.get("/createdBy/:id", createdByControllers.getAllCreatorBoardgame);
router.post(
  "/createdBy/creation/:idcreator/:idboardgame",
  createdByControllers.postCreatedByBoardgame
);
router.delete(
  "/createdBy/delete/:idcreator/:idboardgame",
  createdByControllers.deleteCreatedByBoardgame
);

// *
// Routes de la table creator
// *

router.get("/creators", creatorControllers.getAllCreators);
router.post("/creators", creatorControllers.postCreator);
router.put("/creators/:id", creatorControllers.putCreator);

// *
// Routes de la table editor
// *

router.get("/editors", editorControllers.getAllEditors);
router.post("/editors", editorControllers.postEditor);
router.put("/editors/:id", editorControllers.putEditor);

module.exports = router;
