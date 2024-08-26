const { isEmpty } = require("lodash");

const { update, find, create } = require("../../helpers/tables");
const { Customer } = require("../../models/customer");
const { constructObjectId } = require("../../utils/db");
const { patchConnectionSchema } = require("../../validators/customers");
const { validateInputFields } = require("../../validators/");
const { throwError } = require("../../utils/errors");

const getCustomersHandler = async (_, res) => {
  const user = await find(Customer);

  if (isEmpty(user)) {
    throwError("noRecordsFound");
  }

  return res.json(user).end();
};

const getCustomerDetailsHandler = async (req, res) => {
  const { id } = req.params;

  const userId = constructObjectId(id);

  const user = await find(Customer, { userId });

  if (isEmpty(user)) {
    throwError("unableToAccessData");
  }

  return res.json(user).end();
};

const postCustomerHandler = async (req, res) => {
  const { _id: userId, name } = req.user;

  let user = await find(Customer, { userId });

  if (!isEmpty(user)) {
    throwError("recordAlreadyExists");
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
    throwError("unableToInsertData");
  }

  return res.json(response).end();
};

module.exports = {
  getCustomerDetailsHandler,
  getCustomersHandler,
  patchConnectionHandler,
  postCustomerHandler,
};
