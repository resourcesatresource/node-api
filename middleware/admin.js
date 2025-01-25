const config = require("config");

const { throwError } = require("../utils/errors");
const { ErrorKind } = require("../constants/errors");

module.exports = function (level = []) {
  return (req, _, next) => {
    if (!req.user.isAdmin) {
      throwError(ErrorKind.unauthorizedNotAdmin);
    }

    const superUserEmail = config.get("config.project.superuser");

    req.user.context = {
      roles: {
        superUser: superUserEmail === req.user.email,
        moderator: req.user.isAdmin,
      },
    };

    const userAssigned = req.user.context.roles;

    level.map((role) => {
      if (!userAssigned[role]) {
        throwError(ErrorKind.unauthorizedNotProperAccess);
      }
    });

    next();
  };
};
