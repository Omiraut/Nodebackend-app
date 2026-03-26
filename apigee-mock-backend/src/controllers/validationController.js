const { sendSuccess, sendError } = require("../utils/responseBuilder");

async function validateQuery(req, res) {
  return sendSuccess(req, res, {
    message: "Query validation passed",
    received: req.validated.query
  });
}

async function validateJson(req, res) {
  if (String(req.query.forceError).toLowerCase() === "true") {
    return sendError(req, res, "VALIDATION_ERROR", "Invalid request", 400, [
      { field: "forceError", issue: "invalid" }
    ]);
  }

  return sendSuccess(req, res, {
    message: "JSON body validation passed",
    received: req.validated.body
  });
}

async function validateNested(req, res) {
  return sendSuccess(req, res, {
    message: "Nested JSON validation passed",
    received: req.validated.nested
  });
}

async function validateHeaders(req, res) {
  return sendSuccess(req, res, {
    message: "Header validation passed",
    received: req.validated.headers
  });
}

async function validateXml(req, res) {
  return sendSuccess(req, res, {
    message: "XML validation passed",
    received: req.validated.xml
  });
}

async function validateForm(req, res) {
  return sendSuccess(req, res, {
    message: "Form validation passed",
    received: {
      username: req.validated.form.username
    }
  });
}

async function validateMultipart(req, res) {
  return sendSuccess(req, res, {
    message: "Multipart validation passed",
    received: req.validated.multipart
  });
}

module.exports = {
  validateQuery,
  validateJson,
  validateNested,
  validateHeaders,
  validateXml,
  validateForm,
  validateMultipart
};
