const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

const postVerifyAuthTokenHandler = async (req, res) => {
  const { _id: id, name, email, isAdmin, username } = req.user;
  return res.json({
    status: CUSTOM_RESPONSE_STATUS.OK,
    user: {
      id,
      name,
      email,
      isAdmin,
      username,
    },
  });
};

module.exports = { postVerifyAuthTokenHandler };
