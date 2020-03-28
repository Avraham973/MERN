/** @format */

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get token from the header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token. authoration denied" }); // 401 -not authoraized
  }

  //verfiy the token
  try {
    const decoded = jwt.verify(token, config.get("jwrToken"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
