const config = require("config");
const { isEmpty, pick } = require("lodash");

const {
  getByEmail,
  update,
  User,
  getByUsername,
} = require("../../models/user");
const { checkIfAlreadyRequested } = require("./helpers");
const { validateInputFields } = require("../../validators");
const { compareHash, generateHash } = require("../../services/bcrypt");
const { throwError } = require("../../utils/errors");
const { create, find } = require("../../helpers/tables");
const {
  postUserSchema,
  postUsernameSchema,
} = require("../../validators/users");
const { ErrorKind } = require("../../constants/errors");
const { CUSTOM_RESPONSE_STATUS } = require("../../constants");

const getUserHandler = async (_, res) => {
  const users = await find(User);
  return res.json(users).end();
};

const getAdminsHandler = async (req, res) => {
  const superUserEmail = config.get("config.project.superuser");

  const { email } = req.user;

  if (email !== superUserEmail) {
    throwError(ErrorKind.unauthorizedNotSuperAdmin);
  }

  const admins = await find(User, { isAdmin: true });

  const response = (admins ?? []).filter(
    ({ email }) => email !== superUserEmail
  );

  return res.json(response);
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

const postResetPasswordHandler = async (req, res) => {
  const { old: currentPassword, new: newPassword } = req.body;

  const { email } = req.user;

  const user = await find(User, { email });

  const { password: storedHashedPassword } = user[0];

  const currentPasswordConfirmation = await compareHash(
    currentPassword,
    storedHashedPassword
  );

  if (!currentPasswordConfirmation) {
    throwError(
      ErrorKind.invalidCurrentPassword,
      ErrorKind.invalidCurrentPassword
    );
  }

  const newHashedPassword = await generateHash(newPassword);

  const isSame = await compareHash(newPassword, storedHashedPassword);

  if (isSame) {
    throwError(
      ErrorKind.newPasswordMustNotBeSame,
      ErrorKind.newPasswordMustNotBeSame
    );
  }

  const updatedUser = await update(email, { password: newHashedPassword });

  if (isEmpty(updatedUser)) {
    throwError(ErrorKind.unableToUpdateData);
  }

  return res.json({ status: CUSTOM_RESPONSE_STATUS.OK }).end();
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

const getAdminRequestsHandler = async (req, res) => {
  const { email } = req.user;

  const user = await getByEmail(email);

  return res.json(user?.requests ?? []);
};

const postAdminRevokeHandler = async (req, res) => {
  const { id: email } = req.params;

  const user = await getByEmail(email);

  if (!user) {
    throwError(ErrorKind.userWithEmailNotExists);
  }

  if (!user.isAdmin) {
    throwError(ErrorKind.userNotAdmin);
  }

  user.isAdmin = false;
  await user.save();

  return res.json({ status: true }).end();
};

const postUsernameHandler = async (req, res) => {
  validateInputFields(postUsernameSchema, req.body);

  const { username } = req.body;
  const { email } = req.user;

  const isUsernameExists = await getByUsername(username);

  if (isUsernameExists) {
    throwError(ErrorKind.usernameAlreadyTaken);
  }

  const user = await getByEmail(email);

  if (!user) {
    throwError(ErrorKind.userWithEmailNotExists);
  }

  user.username = username;
  await user.save();

  return res.json({ message: "Success" });
};

module.exports = {
  getUserHandler,
  postUserHandler,
  postUsernameHandler,
  postResetPasswordHandler,
  getAdminsHandler,
  postAdminHandler,
  getAdminRequestsHandler,
  postAdminRequestHandler,
  getAdminStatusHandler,
  postAdminRevokeHandler,
};
