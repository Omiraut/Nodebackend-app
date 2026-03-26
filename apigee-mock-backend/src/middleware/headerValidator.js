const AppError = require("../utils/appError");

function headerValidator(req, res, next) {
  const requiredFromQuery = req.query.requireHeaders;
  const requiredFromHeader = req.headers["x-require-headers"];
  const merged = requiredFromQuery || requiredFromHeader;

  if (!merged) {
    return next();
  }

  const requiredHeaders = String(merged)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const missing = requiredHeaders.filter((name) => !req.headers[name]);
  if (missing.length > 0) {
    return next(
      new AppError(
        "VALIDATION_ERROR",
        "Invalid request",
        400,
        missing.map((name) => ({ field: name, issue: "missing" }))
      )
    );
  }

  return next();
}

module.exports = headerValidator;
