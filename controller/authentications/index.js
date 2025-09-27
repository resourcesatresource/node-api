const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

const postVerifyAuthTokenHandler = async (req, res) => {
  const { _id, name, email, isAdmin, username } = req.user;
  return res.json({
    status: CUSTOM_RESPONSE_STATUS.OK,
    user: {
      _id,
      name,
      email,
      isAdmin,
      username,
    },
  });
};

module.exports = { postVerifyAuthTokenHandler };
