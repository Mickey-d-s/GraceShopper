const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("token in authRequired:", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Req.user: ", req.user);
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "You are not authorized!",
    });
    return;
  }
  next();
};
module.exports = { authRequired };
