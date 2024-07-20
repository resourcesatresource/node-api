/*
    This will forward the error thrown inside handler
    and the error will be captured by error middleware
*/
const asyncWrapper = (handler) => {
  return async function routeHandler(req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { asyncWrapper };
