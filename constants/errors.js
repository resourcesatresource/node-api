const HttpStatusCodes = require("./https");

const ErrorKind = {
  unRecognized: "unRecognized",
  unableToInsertData: "unableToInsertData",
  unableToAccessData: "unableToAccessData",
  unableToDeleteData: "unableToDeleteData",
  unableToUpdateData: "unableToUpdateData",
  unableToCompleteRequest: "unableToCompleteRequest",
  unauthorized: "unauthorized",
  noRecordsFound: "noRecordsFound",
  notAllowedToDelete: "notAllowedToDelete",
  notAllowedToEdit: "notAllowedToEdit",
  recordAlreadyExists: "recordAlreadyExists",
  userAlreadyExists: "userAlreadyExists",
  userAlreadyAdmin: "userAlreadyAdmin",
  userAlreadyRequestedForAdmin: "userAlreadyRequestedForAdmin",
  userWithEmailNotExists: "userWithEmailNotExists",
  userNotInRequestersList: "userNotInRequestersList",
  invalidPassword: "invalidPassword",
  invalidCurrentPassword: "invalidCurrentPassword",
  newPasswordMustNotBeSame: "newPasswordMustNotBeSame",
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
  [ErrorKind.invalidPassword]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "Invalid Password for the user.",
  },
  [ErrorKind.invalidCurrentPassword]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "You have entered wrong current password.",
  },
  [ErrorKind.newPasswordMustNotBeSame]: {
    code: HttpStatusCodes.BAD_REQUEST,
    message: "New password and old password cannot be the same.",
  },
};

const getErrorDetails = (kind) => {
  return ERROR_TYPE?.[kind] ?? ERROR_TYPE.unRecognized;
};

module.exports = { getErrorDetails, ErrorKind };
