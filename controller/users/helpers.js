const checkIfAlreadyRequested = (requesterList, requesterEmail) => {
  return requesterList.some((requester) => {
    if (requester.requesterEmailId === requesterEmail) {
      return true;
    }
  });
};

module.exports = { checkIfAlreadyRequested };
