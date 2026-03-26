const express = require("express");
const routes = require("./routes");
const correlationId = require("./middleware/correlationId");
const requestLogger = require("./middleware/requestLogger");
const statusOverride = require("./middleware/statusOverride");
const delayHandler = require("./middleware/delayHandler");
const headerValidator = require("./middleware/headerValidator");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(correlationId);
app.use(requestLogger);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  "/payload/xml",
  express.text({ type: ["application/xml", "text/xml", "application/*+xml"], limit: "10mb" })
);
app.use(
  "/validate/xml",
  express.text({ type: ["application/xml", "text/xml", "application/*+xml"], limit: "2mb" })
);
app.use("/payload/multipart", express.raw({ type: "multipart/form-data", limit: "20mb" }));
app.use("/validate/multipart", express.raw({ type: "multipart/form-data", limit: "2mb" }));
app.use("/payload/binary", express.raw({ type: "application/octet-stream", limit: "20mb" }));

app.use(statusOverride);
app.use(delayHandler);
app.use(headerValidator);
app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
