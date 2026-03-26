const AppError = require("../utils/appError");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const XML_USER_REGEX = /<user>[\s\S]*<\/user>/i;
const XML_NAME_REGEX = /<name>([\s\S]*?)<\/name>/i;
const XML_AGE_REGEX = /<age>([\s\S]*?)<\/age>/i;
const MAX_MULTIPART_SIZE_BYTES = 1024 * 1024; // 1 MB

function asValidationError(details) {
  return new AppError("VALIDATION_ERROR", "Invalid request", 400, details);
}

function pushIssue(details, field, issue) {
  details.push({ field, issue });
}

function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lower = value.trim().toLowerCase();
    if (lower === "true") {
      return true;
    }
    if (lower === "false") {
      return false;
    }
  }
  return null;
}

function validateQuery(req, res, next) {
  const details = [];
  const { userId, type, active } = req.query;

  if (userId === undefined || userId === null || userId === "") {
    pushIssue(details, "userId", "missing");
  }
  const parsedUserId = Number(userId);
  if (userId !== undefined && (!Number.isFinite(parsedUserId) || Number.isNaN(parsedUserId))) {
    pushIssue(details, "userId", "type_mismatch");
  }

  if (!type) {
    pushIssue(details, "type", "missing");
  } else if (!["basic", "premium"].includes(String(type).toLowerCase())) {
    pushIssue(details, "type", "invalid");
  }

  let parsedActive;
  if (active !== undefined) {
    parsedActive = parseBoolean(active);
    if (parsedActive === null) {
      pushIssue(details, "active", "type_mismatch");
    }
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.query = {
    userId: parsedUserId,
    type: String(type).toLowerCase(),
    ...(active !== undefined ? { active: parsedActive } : {})
  };
  return next();
}

function validateBody(req, res, next) {
  const details = [];
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return next(asValidationError([{ field: "body", issue: "missing" }]));
  }

  if (body.name === undefined || body.name === null || body.name === "") {
    pushIssue(details, "name", "missing");
  } else if (typeof body.name !== "string") {
    pushIssue(details, "name", "type_mismatch");
  } else if (body.name.trim().length < 3) {
    pushIssue(details, "name", "invalid");
  }

  if (body.age === undefined || body.age === null || body.age === "") {
    pushIssue(details, "age", "missing");
  } else if (typeof body.age !== "number" || Number.isNaN(body.age)) {
    pushIssue(details, "age", "type_mismatch");
  } else if (body.age < 18 || body.age > 60) {
    pushIssue(details, "age", "invalid");
  }

  if (body.email === undefined || body.email === null || body.email === "") {
    pushIssue(details, "email", "missing");
  } else if (typeof body.email !== "string") {
    pushIssue(details, "email", "type_mismatch");
  } else if (!EMAIL_REGEX.test(body.email)) {
    pushIssue(details, "email", "invalid");
  }

  if (body.isActive === undefined || body.isActive === null || body.isActive === "") {
    pushIssue(details, "isActive", "missing");
  } else if (typeof body.isActive !== "boolean") {
    pushIssue(details, "isActive", "type_mismatch");
  }

  if (body.roles === undefined || body.roles === null) {
    pushIssue(details, "roles", "missing");
  } else if (!Array.isArray(body.roles)) {
    pushIssue(details, "roles", "type_mismatch");
  } else if (body.roles.some((role) => typeof role !== "string" || role.trim() === "")) {
    pushIssue(details, "roles", "invalid");
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.body = body;
  return next();
}

function validateNested(req, res, next) {
  const details = [];
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return next(asValidationError([{ field: "body", issue: "missing" }]));
  }

  if (!body.user || typeof body.user !== "object" || Array.isArray(body.user)) {
    pushIssue(details, "user", "missing");
  } else {
    if (body.user.id === undefined || body.user.id === null || body.user.id === "") {
      pushIssue(details, "user.id", "missing");
    } else if (typeof body.user.id !== "number" || Number.isNaN(body.user.id)) {
      pushIssue(details, "user.id", "type_mismatch");
    }

    if (
      !body.user.profile ||
      typeof body.user.profile !== "object" ||
      Array.isArray(body.user.profile)
    ) {
      pushIssue(details, "user.profile", "missing");
    } else {
      if (typeof body.user.profile.firstName !== "string" || !body.user.profile.firstName.trim()) {
        pushIssue(details, "user.profile.firstName", "invalid");
      }
      if (typeof body.user.profile.lastName !== "string" || !body.user.profile.lastName.trim()) {
        pushIssue(details, "user.profile.lastName", "invalid");
      }
    }
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.nested = body;
  return next();
}

function validateHeaders(req, res, next) {
  const details = [];
  const clientId = req.headers["x-client-id"];
  const requestId = req.headers["x-request-id"];
  const platform = req.headers["x-platform"];

  if (!clientId || !String(clientId).trim()) {
    pushIssue(details, "x-client-id", "missing");
  }
  if (!requestId || !String(requestId).trim()) {
    pushIssue(details, "x-request-id", "missing");
  }
  if (!platform || !String(platform).trim()) {
    pushIssue(details, "x-platform", "missing");
  } else if (!["web", "mobile"].includes(String(platform).toLowerCase())) {
    pushIssue(details, "x-platform", "invalid");
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.headers = {
    "x-client-id": String(clientId),
    "x-request-id": String(requestId),
    "x-platform": String(platform).toLowerCase()
  };
  return next();
}

function validateXML(req, res, next) {
  const details = [];
  const xml = req.body;

  if (typeof xml !== "string" || !xml.trim()) {
    return next(asValidationError([{ field: "body", issue: "missing" }]));
  }

  if (!XML_USER_REGEX.test(xml)) {
    pushIssue(details, "xml", "invalid");
  }

  const nameMatch = xml.match(XML_NAME_REGEX);
  const ageMatch = xml.match(XML_AGE_REGEX);

  if (!nameMatch) {
    pushIssue(details, "name", "missing");
  } else if (!String(nameMatch[1]).trim()) {
    pushIssue(details, "name", "invalid");
  }

  if (!ageMatch) {
    pushIssue(details, "age", "missing");
  } else if (Number.isNaN(Number(ageMatch[1]))) {
    pushIssue(details, "age", "type_mismatch");
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.xml = {
    name: String(nameMatch[1]).trim(),
    age: Number(ageMatch[1])
  };
  return next();
}

function validateForm(req, res, next) {
  const details = [];
  const { username, password } = req.body || {};

  if (!username || !String(username).trim()) {
    pushIssue(details, "username", "missing");
  }

  if (password === undefined || password === null || password === "") {
    pushIssue(details, "password", "missing");
  } else if (typeof password !== "string") {
    pushIssue(details, "password", "type_mismatch");
  } else if (password.length < 6) {
    pushIssue(details, "password", "invalid");
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.form = { username: String(username), password: String(password) };
  return next();
}

function validateMultipart(req, res, next) {
  const details = [];
  const raw = req.body;

  if (!raw || !Buffer.isBuffer(raw) || raw.length === 0) {
    pushIssue(details, "file", "missing");
  } else {
    if (raw.length > MAX_MULTIPART_SIZE_BYTES) {
      pushIssue(details, "file", "invalid");
    }
    const rawText = raw.toString("utf8");
    if (!/filename="[^"]+"/i.test(rawText)) {
      pushIssue(details, "file", "missing");
    }
  }

  if (details.length > 0) {
    return next(asValidationError(details));
  }

  req.validated = req.validated || {};
  req.validated.multipart = { bytes: raw.length, maxSizeBytes: MAX_MULTIPART_SIZE_BYTES };
  return next();
}

module.exports = {
  validateQuery,
  validateBody,
  validateNested,
  validateHeaders,
  validateXML,
  validateForm,
  validateMultipart
};
