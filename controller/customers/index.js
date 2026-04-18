const { isEmpty } = require("lodash");

const { update, find, create, findOne } = require("../../helpers/tables");
const { Customer } = require("../../models/customer");
const { constructObjectId } = require("../../utils/db");
const {
  patchConnectionSchema,
  patchEditConnectionSchema,
} = require("../../validators/customers");
const { validateInputFields, validateObjectId } = require("../../validators/");
const { throwError } = require("../../utils/errors");
const { ErrorKind } = require("../../constants/errors");
const { checkIfConnectionExists } = require("./helpers");
const { User } = require("../../models/user");

const getCustomersHandler = async (_, res) => {
  const user = await find(Customer);

  if (isEmpty(user)) {
    throwError(ErrorKind.noRecordsFound);
  }

  return res.json(user).end();
};

const getCustomerDetailsHandler = async (req, res) => {
  const { id } = req.params;

  const isObjectIdValid = validateObjectId(id, false);

  const searchPayload = {};

  // If the id is a valid ObjectId, we will search by userId field, else we will search by username field.
  if (!isObjectIdValid) {
    const user = await findOne(User, { username: id });
    if (isEmpty(user)) {
      throwError(ErrorKind.noRecordsFound);
    }

    searchPayload.userId = user._id;
  } else {
    searchPayload.userId = constructObjectId(id);
  }

  const user = await find(Customer, searchPayload).populate({
    path: "userId",
    select: "profileImage",
  });

  if (isEmpty(user)) {
    throwError(ErrorKind.unableToAccessData);
  }

  const response = user.map((customer) => {
    const customerObj = customer.toObject();
    const imageData = customerObj?.userId?.profileImage?.data;
    const contentType = customerObj?.userId?.profileImage?.contentType;
    let base64Image = null;

    if (imageData) {
      if (Buffer.isBuffer(imageData)) {
        base64Image = imageData.toString("base64");
      } else if (imageData?.type === "Buffer" && Array.isArray(imageData.data)) {
        base64Image = Buffer.from(imageData.data).toString("base64");
      } else if (imageData?.buffer && Buffer.isBuffer(imageData.buffer)) {
        base64Image = imageData.buffer.toString("base64");
      }
    }

    if (customerObj?.userId) {
      customerObj.userId.profileImage = base64Image
        ? `data:${contentType};base64,${base64Image}`
        : null;
    }

    return customerObj;
  });

  return res.json(response).end();
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

  const { name, description = "", url, iconName = "" } = req.body;

  const response = await update(
    Customer,
    { userId },
    {
      $addToSet: { connections: { name, description, url, iconName } },
    },
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
    isEmpty(customerDetails) ||
    !checkIfConnectionExists(id, customerDetails)
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
    },
  );

  if (isEmpty(response)) {
    throwError(ErrorKind.unableToDeleteData);
  }

  return res.json(response).end();
};

const patchEditConnectionHandler = async (req, res) => {
  const id = req.params.id;

  validateObjectId(id);

  validateInputFields(patchEditConnectionSchema, req.body, res);

  const { _id: userId } = req.user;

  const { name, description = "", url, iconName = "" } = req.body;

  const response = await update(
    Customer,
    {
      userId,
      "connections._id": constructObjectId(id),
    },
    {
      $set: {
        "connections.$.name": name,
        "connections.$.description": description,
        "connections.$.url": url,
        "connections.$.iconName": iconName,
        "connections.$.updatedAt": new Date(),
      },
    },
  );

  if (isEmpty(response)) {
    throwError(ErrorKind.unableToUpdateData);
  }

  return res.json(response).end();
};

module.exports = {
  getCustomerDetailsHandler,
  getCustomersHandler,
  patchConnectionHandler,
  postCustomerHandler,
  deleteConnectionHandler,
  patchEditConnectionHandler,
};
