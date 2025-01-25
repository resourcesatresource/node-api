const jwt = require("jsonwebtoken");
const config = require("config");

const { getByEmail } = require("../models/user");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Not authorized");

  try {
    const decoded = jwt.verify(token, config.get("jwtprivatekey"));
    const user = await getByEmail(decoded.email);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
