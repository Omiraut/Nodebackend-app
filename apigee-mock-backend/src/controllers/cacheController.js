const { sendSuccess } = require("../utils/responseBuilder");

async function cacheable(req, res) {
  return sendSuccess(req, res, {
    key: "static-cache-key",
    message: "This response is static and cache-friendly"
  });
}

async function nonCacheable(req, res) {
  return sendSuccess(req, res, {
    message: "This response includes dynamic time",
    generatedAt: new Date().toISOString()
  });
}

async function ratelimitTest(req, res) {
  return sendSuccess(req, res, "Ratelimit test endpoint reached");
}

async function spikeTest(req, res) {
  return sendSuccess(req, res, "Spike arrest test endpoint reached");
}

module.exports = {
  cacheable,
  nonCacheable,
  ratelimitTest,
  spikeTest
};
