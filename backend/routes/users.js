const { Router } = require("express");
const controllers = require("../controllers/users");
const usersRouter = Router();

usersRouter.post("/signup", controllers.signUp);
usersRouter.post("/signin", controllers.signIn);
usersRouter.get("/:username", controllers.getUserByUsername);
module.exports = usersRouter;
