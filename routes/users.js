const userRouter = require("express").Router();
const { authRequired } = require("./utils");
const { getUserByUsername } = require("../db/adapters/users.js");

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
  } catch (error) {
    next({
      name: "Login Failed",
      message: "Invalid Username or Password",
    });
  }
});
userRouter.get("/me", authRequired, (req, res, next) => {
  res.send(req.user);
});

module.exports = userRouter;
