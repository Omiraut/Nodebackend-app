const { sendSuccess, createMeta, resolvedStatus } = require("../utils/responseBuilder");
const { buildLargeArray } = require("../services/simulationService");

async function successJson(req, res) {
  return sendSuccess(req, res, "JSON success response");
}

async function successXml(req, res) {
  const payload = {
    status: "success",
    data: { response: "XML success response" },
    meta: createMeta()
  };
  const xml = [
    "<root>",
    `  <status>${payload.status}</status>`,
    "  <data>",
    `    <response>${payload.data.response}</response>`,
    "  </data>",
    "  <meta>",
    `    <timestamp>${payload.meta.timestamp}</timestamp>`,
    `    <version>${payload.meta.version}</version>`,
    "  </meta>",
    "</root>"
  ].join("\n");
  return res.status(resolvedStatus(req, 200)).type("application/xml").send(xml);
}

async function successText(req, res) {
  const payload = {
    status: "success",
    data: { response: "TEXT success response" },
    meta: createMeta()
  };
  return res.status(resolvedStatus(req, 200)).type("text/plain").send(JSON.stringify(payload));
}

async function successLarge(req, res) {
  return sendSuccess(req, res, {
    message: "Large success payload",
    items: buildLargeArray(1000)
  });
}

module.exports = {
  successJson,
  successXml,
  successText,
  successLarge
};
