const CUSTOM_RESPONSE_STATUS = {
  OK: "OK",
};

const TIME_FACTOR = {
  MINUTES_IN_AN_HOUR: 60,
  SECONDS_IN_AN_HOUR: 60,
  MILLISECONDS_IN_A_SECOND: 1000,
};

const ENVIRONMENT = {
  development: "development",
  production: "production",
};

const MAX_ENCRYPTION_ROUND = 10;

const TRIM_REGEX = /^\S.*\S$|^\S$/;

const GET_GENRES_DEFAULT = {
  page: 1,
  limit: 25,
};

module.exports = {
  CUSTOM_RESPONSE_STATUS,
  ENVIRONMENT,
  GET_GENRES_DEFAULT,
  MAX_ENCRYPTION_ROUND,
  TIME_FACTOR,
  TRIM_REGEX,
};
