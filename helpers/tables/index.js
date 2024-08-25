const update = (model, filters, params = {}, options = {}) => {
  return model.findOneAndUpdate(filters, params, {
    returnDocument: "after",
    ...options,
  });
};

const find = (model, filters) => {
  return model.find(filters);
};

const create = (model, params) => {
  const instance = new model(params);
  return instance.save();
};

module.exports = { find, create, update };
