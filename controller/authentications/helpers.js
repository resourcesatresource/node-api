/**
 * `isResetTokenExpired` function checks if the reset token is expired or not.
 *
 * @param {Date} t Time at which the token will expire.
 * @returns {Boolean}
 */
const isResetTokenExpired = (t) => {
  const currentDateTime = new Date();
  const tokenExpiryDateTime = new Date(t);

  return tokenExpiryDateTime < currentDateTime;
};

module.exports = { isResetTokenExpired };
