const { DEFAULT_TIMEOUT_MS } = require("../config/constants");
const { sendSuccess } = require("../utils/responseBuilder");
const { sleep, parseInteger } = require("../utils/helpers");

async function delayByParam(req, res) {
  const ms = parseInteger(req.params.ms);
  const delayMs = ms !== null && ms >= 0 ? ms : 0;
  if (delayMs > 0) {
    await sleep(delayMs);
  }
  return sendSuccess(req, res, `Delayed by ${delayMs} ms`);
}

async function timeoutSimulation(req, res) {
  await sleep(DEFAULT_TIMEOUT_MS);
  return sendSuccess(req, res, `Timeout simulation response after ${DEFAULT_TIMEOUT_MS} ms`);
}

module.exports = {
  delayByParam,
  timeoutSimulation
};
