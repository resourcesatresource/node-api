const HttpStatusCodes = require("./https");

const ErrorKind = {
  unRecognized: "unRecognized",
  unableToInsertData: "unableToInsertData",
  unableToAccessData: "unableToAccessData",
  unableToDeleteData: "unableToDeleteData",
  unableToUpdateData: "unableToUpdateData",
  unableToCompleteRequest: "unableToCompleteRequest",
  unableToSendResetLink: "unableToSendResetLink",
  unauthorized: "unauthorized",
  unauthorizedNotAdmin: "unauthorizedNotAdmin",
  unauthorizedNotProperAccess: "unauthorizedNotProperAccess",
  unauthorizedNotSuperAdmin: "unauthorizedNotSuperAdmin",
  noRecordsFound: "noRecordsFound",
  notAllowedToDelete: "notAllowedToDelete",
  notAllowedToEdit: "notAllowedToEdit",
  recordAlreadyExists: "recordAlreadyExists",
  resetTokenAlreadyExists: "resetTokenAlreadyExists",
  userAlreadyExists: "userAlreadyExists",
  userAlreadyAdmin: "userAlreadyAdmin",
  userAlreadyRequestedForAdmin: "userAlreadyRequestedForAdmin",
  userWithEmailNotExists: "userWithEmailNotExists",
  userNotInRequestersList: "userNotInRequestersList",
  userNotAdmin: "userNotAdmin",
  invalidPassword: "invalidPassword",
  invalidCurrentPassword: "invalidCurrentPassword",
  newPasswordMustNotBeSame: "newPasswordMustNotBeSame",
  invalidCredentials: "invalidCredentials",
};

const ERROR_TYPE = {
  [ErrorKind.unRecognized]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong!",
  },
  [ErrorKind.unableToInsertData]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Unable to insert data.",
  },
  [ErrorKind.unableToAccessData]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Unable to access data.",
  },
  [ErrorKind.unableToDeleteData]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Unable to delete data.",
  },
  [ErrorKind.unableToUpdateData]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Unable to update data.",
  },
  [ErrorKind.unableToCompleteRequest]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Unable to complete the request.",
  },
  [ErrorKind.noRecordsFound]: {
    code: HttpStatusCodes.NOT_FOUND,
    message: "No records found for this resource.",
  },
  [ErrorKind.notAllowedToDelete]: {
    code: HttpStatusCodes.FORBIDDEN,
    message: "You don't have proper access to delete this resource.",
  },
  [ErrorKind.notAllowedToEdit]: {
    code: HttpStatusCodes.FORBIDDEN,
    message: "You don't have proper access to edit this resource.",
  },
  [ErrorKind.unauthorized]: {
    code: HttpStatusCodes.UNAUTHORIZED,
    message: "Not authorized.",
  },
  [ErrorKind.recordAlreadyExists]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "Record already exists.",
  },
  [ErrorKind.resetTokenAlreadyExists]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "Token is already sent, please check you mail inbox.",
  },
  [ErrorKind.userAlreadyExists]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "User already exists with this email.",
  },
  [ErrorKind.userAlreadyAdmin]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "Requested user is already an admin.",
  },
  [ErrorKind.userAlreadyRequestedForAdmin]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message:
      "You have already requested for admin access. Please wait until it is approved.",
  },
  [ErrorKind.userWithEmailNotExists]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "User with the given email doesn't exists.",
  },
  [ErrorKind.userNotInRequestersList]: {
    code: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "This user was not in requester list.",
  },
  [ErrorKind.userNotAdmin]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "User was not an admin.",
  },
  [ErrorKind.invalidPassword]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "Invalid Password for the user.",
  },
  [ErrorKind.unauthorized]: {
    code: HttpStatusCodes.UNAUTHORIZED,
    message: "Unauthorized!",
  },
  [ErrorKind.unableToSendResetLink]: {
    message: "Unable to send email at the moment, please try after sometime!",
    code: HttpStatusCodes.SERVICE_UNAVAILABLE,
  },
  [ErrorKind.unauthorizedNotAdmin]: {
    code: HttpStatusCodes.FORBIDDEN,
    message: "Unauthorized as you are not an admin.",
  },
  [ErrorKind.unauthorizedNotProperAccess]: {
    code: HttpStatusCodes.FORBIDDEN,
    message: "Unauthorized as you don't have proper access for this resource.",
  },
  [ErrorKind.unauthorizedNotSuperAdmin]: {
    code: HttpStatusCodes.FORBIDDEN,
    message: "Unauthorized as you don't have the super admin privileges",
  },
  [ErrorKind.invalidCurrentPassword]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "You have entered wrong current password.",
  },
  [ErrorKind.newPasswordMustNotBeSame]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "New password and old password cannot be the same.",
  },
  [ErrorKind.invalidCredentials]: {
    code: HttpStatusCodes.BAD_GATEWAY,
    message: "Invalid credentials!",
  },
};

const getErrorDetails = (kind) => {
  return ERROR_TYPE?.[kind] ?? ERROR_TYPE.unRecognized;
};

module.exports = { getErrorDetails, ErrorKind };
