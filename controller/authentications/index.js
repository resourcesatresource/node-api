const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

const postVerifyAuthTokenHandler = async (req, res) => {
  const { _id, name, email, isAdmin, username, profileImage } = req.user;
  let profileImageSrc = null;
  if (profileImage?.data) {
    const base64Image = profileImage.data.toString("base64");
    const imageSrc = `data:${profileImage.contentType};base64,${base64Image}`;
    profileImageSrc = imageSrc;
  }

  return res.json({
    status: CUSTOM_RESPONSE_STATUS.OK,
    user: {
      _id,
      name,
      email,
      isAdmin,
      username,
      profileImage: profileImageSrc,
    },
  });
};

module.exports = { postVerifyAuthTokenHandler };
