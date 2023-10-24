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
  verifyToken,
} = require("./controllers/authControllers");

const ownedByMiddlewares = require("./middlewares/ownedByMiddlewares");
const editedByMiddlewares = require("./middlewares/editedByMiddlewares");
const createdByMiddlewares = require("./middlewares/createdByMiddlewares");
const {
  foreignKeyOFF,
  foreignKeyON,
} = require("./middlewares/ForeignKeyMiddleware");
const {
  newUser,
  recognizeUser,
  checkIfAdmin,
  checkUser,
  emailValidity,
} = require("./middlewares/userMiddlewares");

// ROUTES PUBLIQUES //

router.get("/", (req, res) => {
  res.send("Welcome Home");
});

// *
// Routes login et logout
// *

router.post("/login", recognizeUser, verifyPassword);
router.post(
  "/inscription",
  emailValidity,
  newUser,
  hashPassword,
  userControllers.postUser
);

// ROUTES PRIVEES //

router.use(verifyToken);

router.get("/logout", userControllers.logout);

// *
// Routes de la table user
// *

router.get("/users", checkIfAdmin, userControllers.getAllUser);
router.get("/users/:iduser", checkIfAdmin, userControllers.getOneUser);
router.put("/users/:iduser", checkUser, userControllers.putOneUser);
router.put("/users/admin/:iduser", checkIfAdmin, userControllers.adminStatus);
router.delete(
  "/users/:iduser",
  checkIfAdmin,
  foreignKeyOFF,
  userControllers.deleteOneUser,
  ownedByControllers.deleteUser,
  foreignKeyON
);

// *
// Routes de la table owned_by
// *

router.get(
  "/user/owned/:iduser",
  checkUser,
  ownedByControllers.getAllUserBoardgames
);
router.post(
  "/user/owned/:iduser/:idboardgame",
  checkUser,
  ownedByMiddlewares.checkIfOwned,
  ownedByControllers.postOwnedBoardgame
);
router.delete(
  "/user/owned/:iduser/:idboardgame",
  checkUser,
  ownedByControllers.deleteOwnedBoardgame
);
router.put(
  "/user/owned/:iduser/:idboardgame",
  checkUser,
  ownedByControllers.updateOwnedBoardgame
);

// *
// Routes de la table boardgame
// *

router.get("/boardgames", boardgameControllers.getAllBoardgames);
router.get("/boardgames/:id", boardgameControllers.getOneBoardgame);
router.post("/boardgames", checkIfAdmin, boardgameControllers.postBoardgame);
router.put("/boardgames/:id", checkIfAdmin, boardgameControllers.putBoardgame);
router.delete(
  "/boardgames/:id",
  checkIfAdmin,
  foreignKeyOFF,
  boardgameControllers.deleteBoardgame,
  foreignKeyON
);

// *
// Routes de la table edited_by
// *

router.get("/editedBy/:id", editedByControllers.getAllEditorBoardgame);
router.get(
  "/editedBy/boardgame/:id",
  editedByControllers.getAllBoardgameEditors
);
router.post(
  "/editedBy/creation/:ideditor/:idboardgame",
  checkIfAdmin,
  editedByControllers.postEditedByBoardgame
);
router.delete(
  "/editedBy/delete/:ideditor/:idboardgame",
  checkIfAdmin,
  editedByControllers.deleteEditedByBoardgame
);

// *
// Routes de la table created_by
// *

router.get("/createdBy/:id", createdByControllers.getAllCreatorBoardgame);
router.get(
  "/createdBy/boardgame/:id",
  createdByControllers.getAllBoardgameCreators
);
router.post(
  "/createdBy/creation/:idcreator/:idboardgame",
  checkIfAdmin,
  createdByControllers.postCreatedByBoardgame
);
router.delete(
  "/createdBy/delete/:idcreator/:idboardgame",
  checkIfAdmin,
  createdByControllers.deleteCreatedByBoardgame
);

// *
// Routes de la table creator
// *

router.get("/creators", creatorControllers.getAllCreators);
router.post("/creators", checkIfAdmin, creatorControllers.postCreator);
router.put("/creators/:id", checkIfAdmin, creatorControllers.putCreator);
router.delete(
  "/creators/:id",
  checkIfAdmin,
  foreignKeyOFF,
  creatorControllers.deleteCreator,
  foreignKeyON
);

// *
// Routes de la table editor
// *

router.get("/editors", editorControllers.getAllEditors);
router.post("/editors", checkIfAdmin, editorControllers.postEditor);
router.put("/editors/:id", checkIfAdmin, editorControllers.putEditor);
router.delete(
  "/editors/:id",
  checkIfAdmin,
  foreignKeyOFF,
  editorControllers.deleteEditor,
  foreignKeyON
);

module.exports = router;
