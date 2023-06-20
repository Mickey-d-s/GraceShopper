const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

require("dotenv").config();

const { getAllUsers, getUserByUsername } = require("../db/adapters/users");

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
    const { username, password } = req.body;

    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: "That user already exists!",
        name: " Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const user = await createUser({ username, password: hashedPassword });

    console.log("JWT secret:", JWT_SECRET);

    const token = jwt.sign(user, JWT_SECRET);
    console.log("token:", token);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete user.password;
    res.send({
      success: true,
      message: "Thank you for regisering",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await getUserByUsername(username);
    console.log("password:", password);
    console.log("userpassword:", user.password);
    const checkedpassword = await bcrypt.compare(password, user.password);
    if (checkedpassword) {
      delete user.password;
      const token = jwt.sign(user, JWT_SECRET);
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

module.exports = usersRouter;
