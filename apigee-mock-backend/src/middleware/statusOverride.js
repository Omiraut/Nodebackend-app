const { parseInteger } = require("../utils/helpers");

function statusOverride(req, res, next) {
  const requestedStatus = parseInteger(req.query.status);
  if (
    requestedStatus !== null &&
    requestedStatus >= 100 &&
    requestedStatus <= 599
  ) {
    req.overrideStatus = requestedStatus;
  }
  next();
}

module.exports = statusOverride;
