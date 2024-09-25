const config = require("config");
const { isEmpty, pick } = require("lodash");

const { getByEmail, update, User } = require("../../models/user");
const { checkIfAlreadyRequested } = require("./helpers");
const { validateInputFields } = require("../../validators");
const { generateHash } = require("../../services/bcrypt");
const { throwError } = require("../../utils/errors");
const { create, find } = require("../../helpers/tables");
const { postUserSchema } = require("../../validators/users");

const getUserHandler = async (_, res) => {
  const users = await find(User);
  return res.json(users).end();
};

const postUserHandler = async (req, res) => {
  validateInputFields(postUserSchema, req.body);

  const { name, email, password: _password } = req.body;

  let user = await find(User, { email });

  if (!isEmpty(user)) {
    throwError("userAlreadyExists");
  }

  const password = await generateHash(_password);

  user = await create(User, { name, email, password });

  if (!user) {
    throwError();
  }

  const secureToken = user.generateAuthToken();

  return res
    .json({
      ...pick(user, ["_id", "name", "email", "isAdmin"]),
      token: secureToken,
    })
    .end();
};

const postAdminRequestHandler = async (req, res) => {
  const recipient = config.get("config.project.superuser");

  const { email: requesterEmailId } = req.user;

  const requester = await getByEmail(requesterEmailId);

  if (requester?.isAdmin) {
    throwError("userAlreadyAdmin");
  }

  const superUser = await getByEmail(recipient);

  const requested = checkIfAlreadyRequested(
    superUser?.requests ?? [],
    requesterEmailId
  );

  if (requested) {
    throwError("userAlreadyRequestedForAdmin");
  }

  const response = await update(recipient, {
    $addToSet: { requests: { requesterEmailId: requesterEmailId } },
  });

  if (!response) {
    throwError("unableToCompleteRequest");
  }

  return res.end();
};

const getAdminStatusHandler = async (req, res) => {
  const email = req.params.id;

  const response = await getByEmail(email);

  if (!response) {
    throwError("userWithEmailNotExists");
  }

  return res
    .json({
      isAdmin: response?.isAdmin || false,
    })
    .end();
};

const postAdminHandler = async (req, res) => {
  const { id: requesterEmailId } = req.params;
  const { email: adminId } = req.user;

  const adminData = await getByEmail(adminId);

  const requested = checkIfAlreadyRequested(
    adminData?.requests ?? [],
    requesterEmailId
  );

  if (!requested) {
    throwError("userNotInRequestersList");
  }

  await Promise.all([
    update(requesterEmailId, { isAdmin: true }),
    update(adminId, {
      $pull: { requests: { requesterEmailId: requesterEmailId } },
    }),
  ]);

  return res.end();
};

module.exports = {
  getUserHandler,
  postUserHandler,
  postAdminHandler,
  postAdminRequestHandler,
  getAdminStatusHandler,
};
