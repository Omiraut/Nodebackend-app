const crypto = require("crypto");

function correlationId(req, res, next) {
  const incomingId = req.headers["x-correlation-id"];
  const id = incomingId || crypto.randomUUID();
  req.correlationId = id;
  res.setHeader("x-correlation-id", id);
  next();
}

module.exports = correlationId;
