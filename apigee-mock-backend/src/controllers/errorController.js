const { sendError } = require("../utils/responseBuilder");

async function error400(req, res) {
  return sendError(req, res, "BAD_REQUEST", "Simulated bad request", 400);
}

async function error401(req, res) {
  return sendError(req, res, "UNAUTHORIZED", "Simulated unauthorized", 401);
}

async function error403(req, res) {
  return sendError(req, res, "FORBIDDEN", "Simulated forbidden", 403);
}

async function error404(req, res) {
  return sendError(req, res, "NOT_FOUND", "Simulated not found", 404);
}

async function error500(req, res) {
  return sendError(req, res, "INTERNAL_ERROR", "Simulated internal error", 500);
}

async function error502(req, res) {
  return sendError(req, res, "BAD_GATEWAY", "Simulated bad gateway", 502);
}

async function error503(req, res) {
  return sendError(req, res, "SERVICE_UNAVAILABLE", "Simulated service unavailable", 503);
}

module.exports = {
  error400,
  error401,
  error403,
  error404,
  error500,
  error502,
  error503
};
