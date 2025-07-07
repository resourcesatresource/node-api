const checkIfConnectionExists = (id, customerDetails) => {
  return customerDetails?.connections?.some(
    (connection) => connection._id.toString() === id
  );
};

module.exports = { checkIfConnectionExists };
