const { sendError } = require("../utils/responseBuilder");

function notFound(req, res) {
  return sendError(req, res, "NOT_FOUND", "Endpoint not found", 404);
}

module.exports = notFound;
