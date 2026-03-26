const { createMeta, resolvedStatus } = require("../utils/responseBuilder");
const { sleep } = require("../utils/helpers");

async function chunked(req, res) {
  const payload = {
    status: "success",
    data: {
      response: {
        mode: "chunked",
        message: "Chunked response body"
      }
    },
    meta: createMeta()
  };

  const serialized = JSON.stringify(payload);
  const size = 40;
  const statusCode = resolvedStatus(req, 200);
  res.status(statusCode);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  for (let i = 0; i < serialized.length; i += size) {
    res.write(serialized.slice(i, i + size));
    await sleep(50);
  }
  res.end();
}

async function stream(req, res) {
  const payload = {
    status: "success",
    data: {
      response: {
        mode: "stream",
        chunks: Array.from({ length: 25 }, (_, index) => `chunk-${index + 1}`)
      }
    },
    meta: createMeta()
  };

  const serialized = JSON.stringify(payload);
  const size = 25;
  const statusCode = resolvedStatus(req, 200);
  res.status(statusCode);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  for (let i = 0; i < serialized.length; i += size) {
    res.write(serialized.slice(i, i + size));
    await sleep(100);
  }
  res.end();
}

module.exports = {
  chunked,
  stream
};
