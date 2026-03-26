const AppError = require("../utils/appError");
const { sendSuccess } = require("../utils/responseBuilder");

async function payloadJson(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new AppError("EMPTY_JSON_PAYLOAD", "JSON payload is required", 400);
  }
  return sendSuccess(req, res, {
    type: "json",
    body: req.body
  });
}

async function payloadXml(req, res) {
  const xmlBody = req.body;
  if (!xmlBody || !String(xmlBody).trim()) {
    throw new AppError("EMPTY_XML_PAYLOAD", "XML payload is required", 400);
  }
  return sendSuccess(req, res, {
    type: "xml",
    length: String(xmlBody).length,
    preview: String(xmlBody).slice(0, 200)
  });
}

async function payloadForm(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new AppError("EMPTY_FORM_PAYLOAD", "Form payload is required", 400);
  }
  return sendSuccess(req, res, {
    type: "form",
    body: req.body
  });
}

async function payloadMultipart(req, res) {
  const raw = req.body;
  if (!raw || !Buffer.isBuffer(raw) || raw.length === 0) {
    throw new AppError("EMPTY_MULTIPART_PAYLOAD", "Multipart payload is required", 400);
  }
  const contentType = req.headers["content-type"] || "";
  const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
  const boundary = boundaryMatch ? boundaryMatch[1] : null;
  const rawString = raw.toString("utf8");
  const partCount = boundary ? rawString.split(`--${boundary}`).length - 2 : 0;

  return sendSuccess(req, res, {
    type: "multipart",
    bytes: raw.length,
    boundary,
    estimatedParts: Math.max(partCount, 0)
  });
}

async function payloadBinary(req, res) {
  const raw = req.body;
  if (!raw || !Buffer.isBuffer(raw) || raw.length === 0) {
    throw new AppError("EMPTY_BINARY_PAYLOAD", "Binary payload is required", 400);
  }
  return sendSuccess(req, res, {
    type: "binary",
    bytes: raw.length
  });
}

module.exports = {
  payloadJson,
  payloadXml,
  payloadForm,
  payloadMultipart,
  payloadBinary
};
