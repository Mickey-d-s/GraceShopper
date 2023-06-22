<<<<<<< HEAD
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = process.env;

require("dotenv").config();

const {
  createUser,
  getAllUsers,
  getUserByUsername,
} = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: "That user already exists!",
        name: " Auth Error",
      });
      return;
    }
    console.log("_user:", _user);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });
    console.log("user:", user);

    console.log("JWT secret:", JWT_SECRET);
    delete user.password;
    const token = jwt.sign(user, JWT_SECRET);
    console.log("token:", token);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "Thank you for registering",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    console.log("password:", password);
    console.log("userpassword:", user.password);
    const checkedpassword = await bcrypt.compare(password, user.password);
    if (checkedpassword) {
      delete user.password;
      const token = jwt.sign(user, COOKIE_SECRET);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send(user);
    } else {
      next({ message: "invalid login credentials" });
      return;
    }
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
=======
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
>>>>>>> 5d317c76d22f53b5c5e8887322eb4035b92da436
