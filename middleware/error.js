// Error middleware function
module.exports = function (error, req, res, next) {
  console.log("Error middleware");
  res.status(500).send(error);
};
