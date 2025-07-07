const { isEmpty } = require("lodash");

const { update, find, create, findOne } = require("../../helpers/tables");
const { Customer } = require("../../models/customer");
const { constructObjectId } = require("../../utils/db");
const { patchConnectionSchema } = require("../../validators/customers");
const { validateInputFields, validateObjectId } = require("../../validators/");
const { throwError } = require("../../utils/errors");
const { ErrorKind } = require("../../constants/errors");
const { checkIfConnectionExists } = require("./helpers");

const getCustomersHandler = async (_, res) => {
  const user = await find(Customer);

  if (isEmpty(user)) {
    throwError(ErrorKind.noRecordsFound);
  }

  return res.json(user).end();
};

const getCustomerDetailsHandler = async (req, res) => {
  const { id } = req.params;

  validateObjectId(id);

  const userId = constructObjectId(id);

  const user = await find(Customer, { userId });

  if (isEmpty(user)) {
    throwError(ErrorKind.unableToAccessData);
  }

  return res.json(user).end();
};

const postCustomerHandler = async (req, res) => {
  const { _id: userId, name } = req.user;

  let user = await find(Customer, { userId });

  if (!isEmpty(user)) {
    throwError(ErrorKind.recordAlreadyExists);
  }

  user = await create(Customer, {
    userId,
    name,
  });

  return res.send(user).end();
};

const patchConnectionHandler = async (req, res) => {
  validateInputFields(patchConnectionSchema, req.body, res);

  const { _id: userId } = req.user;

  const { name, description = "", url } = req.body;

  const response = await update(
    Customer,
    { userId },
    {
      $addToSet: { connections: { name, description, url } },
    }
  );

  if (isEmpty(response)) {
    throwError(ErrorKind.unableToInsertData);
  }

  return res.json(response).end();
};

const deleteConnectionHandler = async (req, res) => {
  const id = req.params.id;
  const { _id: userId } = req.user;

  validateObjectId(id);

  const customerDetails = await findOne(Customer, {
    userId,
  });

  if (
    isEmpty(customerDetails) || !checkIfConnectionExists(id, customerDetails)
  ) {
    throwError(ErrorKind.noRecordsFound);
  }

  const response = await update(
    Customer,
    {
      userId,
    },
    {
      $pull: {
        connections: { _id: constructObjectId(id) },
      },
    }
  );

  if (isEmpty(response)) {
    throwError(ErrorKind.unableToDeleteData);
  }

  return res.json(response).end();
};

module.exports = {
  getCustomerDetailsHandler,
  getCustomersHandler,
  patchConnectionHandler,
  postCustomerHandler,
  deleteConnectionHandler,
};
