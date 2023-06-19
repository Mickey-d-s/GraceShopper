const usersRouter = require("express").Router();

const { getAllUsers, getUserByUsername } = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
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

module.export = usersRouter;
