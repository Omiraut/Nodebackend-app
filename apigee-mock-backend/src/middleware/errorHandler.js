const { sendError } = require("../utils/responseBuilder");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err && err.type === "entity.parse.failed") {
    return sendError(req, res, "VALIDATION_ERROR", "Invalid request", 400, [
      { field: "body", issue: "invalid" }
    ]);
  }

  if (err && (err.type === "entity.too.large" || err.status === 413)) {
    return sendError(req, res, "VALIDATION_ERROR", "Invalid request", 400, [
      { field: "body", issue: "invalid" }
    ]);
  }

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Internal server error";
  const details = Array.isArray(err.details) ? err.details : undefined;
  return sendError(req, res, code, message, statusCode, details);
}

module.exports = errorHandler;
