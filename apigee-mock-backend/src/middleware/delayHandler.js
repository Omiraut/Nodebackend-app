const { sleep, parseInteger } = require("../utils/helpers");

async function delayHandler(req, res, next) {
  const delayMs = parseInteger(req.query.delay);
  if (delayMs !== null && delayMs > 0) {
    await sleep(delayMs);
  }
  next();
}

module.exports = delayHandler;
