const ERROR_TYPE = {
  unRecognized: {
    code: 500,
    message: "Something went wrong",
  },
  unableToInsertData: {
    code: 500,
    message: "Unable to insert data into DB",
  },
  unableToAccessData: {
    code: 500,
    message: "Unable to access data",
  },
  unableToCompleteRequest: {
    code: 500,
    message: "Unable to complete the request!",
  },
  noRecordsFound: {
    code: 500,
    message: "No records found in DB",
  },
  recordAlreadyExists: {
    code: 500,
    message: "Record already exists in DB",
  },
  userAlreadyExists: {
    code: 400,
    message: "User already exists with this email",
  },
  userAlreadyAdmin: {
    code: 400,
    message: "Requested user is already an admin",
  },
  userAlreadyRequestedForAdmin: {
    code: 400,
    message: "You have already requested for admin access",
  },
  userWithEmailNotExists: {
    code: 500,
    message: "User with the given email doesn't exists",
  },
  userNotInRequestersList: {
    code: 500,
    message: "This user was not in requester list",
  },
  invalidPassword: {
    code: 400,
    message: "Invalid Password for the user",
  },
};

const getErrorDetails = (kind) => {
  return ERROR_TYPE?.[kind] ?? ERROR_TYPE.unRecognized;
};

module.exports = { getErrorDetails };
