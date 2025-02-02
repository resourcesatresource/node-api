const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

const postVerifyAuthTokenHandler = async (_, res) => {
  return res.json({
    status: CUSTOM_RESPONSE_STATUS.OK,
  });
};

module.exports = { postVerifyAuthTokenHandler };
