const { getByEmail, update } = require("../../models/user");
const { validateInputFields } = require("../../validators");
const { postAdminRequestSchema } = require("../../validators/users");

const postAdminRequestHandler = async (req, res) => {
  try {
    validateInputFields(postAdminRequestSchema, req.body, res);

    const { email } = req.body;

    const user = await getByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ message: `Requested user ${email} is not a user` })
        .end();
    }

    if (user?.isAdmin) {
      return res
        .status(400)
        .json({ message: `Requested user ${email} is already an admin` })
        .end();
    }

    const response = await update(email, { isAdmin: true });

    if (!response?.isAdmin) {
      return res
        .status(500)
        .json({ message: "Unable to complete the request!" })
        .end();
    }

    return res.end();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAdminStatusHandler = async (req, res) => {
  try {
    const email = req.params.id;

    const response = await getByEmail(email);

    if (!response) {
      return res
        .status(500)
        .json({ message: `User with email ${email} doesn't exist` })
        .end();
    }

    return res
      .json({
        isAdmin: response?.isAdmin || false,
      })
      .end();
  } catch (err) {
    return res.status(500).json({ message: err?.message });
  }
};

module.exports = { postAdminRequestHandler, getAdminStatusHandler };
