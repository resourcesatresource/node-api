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
  noRecordsFound: {
    code: 500,
    message: "No records found in DB",
  },
};

const getErrorDetails = (kind) => {
  return ERROR_TYPE?.[kind] ?? ERROR_TYPE.unRecognized;
};

module.exports = { getErrorDetails };
