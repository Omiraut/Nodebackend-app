const AppError = require("../utils/appError");
const { sendSuccess } = require("../utils/responseBuilder");

async function apikeyRequired(req, res) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    throw new AppError("MISSING_API_KEY", "Header 'x-api-key' is required", 401);
  }
  return sendSuccess(req, res, "API key header present");
}

async function jwtRequired(req, res) {
  const jwtToken = req.headers["x-jwt-token"];
  if (!jwtToken) {
    throw new AppError("MISSING_JWT", "Header 'x-jwt-token' is required", 401);
  }
  return sendSuccess(req, res, "JWT header present");
}

async function tokenRequired(req, res) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new AppError("MISSING_TOKEN", "Header 'authorization' is required", 401);
  }
  return sendSuccess(req, res, "Authorization header present");
}

module.exports = {
  apikeyRequired,
  jwtRequired,
  tokenRequired
};
