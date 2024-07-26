const config = require("config");
const { getByEmail, update } = require("../../models/user");
const { checkIfAlreadyRequested } = require("./helpers");

const postAdminRequestHandler = async (req, res) => {
  try {
    const recipient = config.get("config.project.superuser");

    const { email: requesterEmailId } = req.user;

    const requester = await getByEmail(requesterEmailId);

    if (requester?.isAdmin) {
      return res
        .status(400)
        .json({ message: "Requested user is already an admin" })
        .end();
    }

    const superUser = await getByEmail(recipient);

    const requested = checkIfAlreadyRequested(
      superUser?.requests ?? [],
      requesterEmailId
    );

    if (requested) {
      return res
        .status(400)
        .json({ message: "You have already requested for admin access" })
        .end();
    }

    const response = await update(recipient, {
      $addToSet: { requests: { requesterEmailId: requesterEmailId } },
    });

    if (!response) {
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

const postAdminHandler = async (req, res) => {
  try {
    const { id: requesterEmailId } = req.params;
    const { email: adminId } = req.user;

    const adminData = await getByEmail(adminId);

    const requested = checkIfAlreadyRequested(
      adminData?.requests ?? [],
      requesterEmailId
    );

    if (!requested) {
      return res
        .status(400)
        .json({ message: `This user was not in requester list` })
        .end();
    }

    await Promise.all([
      update(requesterEmailId, { isAdmin: true }),
      update(adminId, {
        $pull: { requests: { requesterEmailId: requesterEmailId } },
      }),
    ]);

    return res.end();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postAdminHandler,
  postAdminRequestHandler,
  getAdminStatusHandler,
};
