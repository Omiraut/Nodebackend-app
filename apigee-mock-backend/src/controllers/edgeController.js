const { sendSuccess, resolvedStatus } = require("../utils/responseBuilder");
const { buildLargeArray } = require("../services/simulationService");

async function largeResponse(req, res) {
  return sendSuccess(req, res, {
    message: "Large edge response",
    records: buildLargeArray(5000)
  });
}

async function malformedJson(req, res) {
  const status = resolvedStatus(req, 200);
  res.status(status).type("application/json");
  return res.send('{"status":"success","data":{"response":"broken json"');
}

async function malformedXml(req, res) {
  const status = resolvedStatus(req, 200);
  res.status(status).type("application/xml");
  return res.send("<root><status>success</status><data><response>broken xml</data></root>");
}

module.exports = {
  largeResponse,
  malformedJson,
  malformedXml
};
