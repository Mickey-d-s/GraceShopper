const jwt = require("jsonwebtoken");

<<<<<<< HEAD
//this is where we verify token
const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("req.user", req.user);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are not authorized",
=======
const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Req.user: ", req.user);
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "You are not authorized!",
>>>>>>> 5d317c76d22f53b5c5e8887322eb4035b92da436
    });
    return;
  }
  next();
};
<<<<<<< HEAD
=======

>>>>>>> 5d317c76d22f53b5c5e8887322eb4035b92da436
module.exports = { authRequired };
