const { API_VERSION } = require("../config/constants");

function createMeta() {
  return {
    timestamp: new Date().toISOString(),
    version: API_VERSION
  };
}

function resolvedStatus(req, fallbackStatus) {
  if (typeof req.overrideStatus === "number") {
    return req.overrideStatus;
  }
  return fallbackStatus;
}

function successPayload(response) {
  return {
    status: "success",
    data: {
      response
    },
    meta: createMeta()
  };
}

function errorPayload(code, message, details) {
  const error = {
    code,
    message
  };
  if (Array.isArray(details) && details.length > 0) {
    error.details = details;
  }

  return {
    status: "error",
    error,
    meta: createMeta()
  };
}

function sendSuccess(req, res, response, defaultStatus = 200) {
  const status = resolvedStatus(req, defaultStatus);
  return res.status(status).json(successPayload(response));
}

function sendError(req, res, code, message, defaultStatus = 500, details) {
  const status = resolvedStatus(req, defaultStatus);
  return res.status(status).json(errorPayload(code, message, details));
}

module.exports = {
  createMeta,
  successPayload,
  errorPayload,
  sendSuccess,
  sendError,
  resolvedStatus
};
