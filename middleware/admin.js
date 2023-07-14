module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send("Unauthorized as you are not an admin");
  }
  next();
};
