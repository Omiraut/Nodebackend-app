const { sendSuccess, sendError } = require("../utils/responseBuilder");
const { pickRandom, randomDelay } = require("../services/simulationService");

async function randomStatus(req, res) {
  const status = pickRandom([200, 201, 202, 400, 401, 404, 500, 503]);
  req.overrideStatus = typeof req.overrideStatus === "number" ? req.overrideStatus : status;

  if (status >= 400) {
    return sendError(req, res, `RANDOM_${status}`, `Random status produced error ${status}`, status);
  }
  return sendSuccess(req, res, `Random status produced success ${status}`, status);
}

async function randomFailure(req, res) {
  const fail = Math.random() < 0.5;
  if (fail) {
    return sendError(req, res, "RANDOM_FAILURE", "Random failure triggered", 500);
  }
  return sendSuccess(req, res, "Random failure endpoint succeeded");
}

async function randomDelayEndpoint(req, res) {
  const delayedMs = await randomDelay(100, 3000);
  return sendSuccess(req, res, `Random delay applied: ${delayedMs} ms`);
}

module.exports = {
  randomStatus,
  randomFailure,
  randomDelayEndpoint
};
