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
      message: "YOU are not authorized!",
    });
    return;
  }
  next();
};

const checkForAdmin = (req, res, next) => {
  try {
    const { user } = req;
    if (user.is_admin) {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error: "YOU are not authorized",
    });
  }
};

module.exports = { authRequired, checkForAdmin };
