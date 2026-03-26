function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseInteger(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return "{}";
  }
}

module.exports = {
  sleep,
  parseInteger,
  safeJsonStringify
};
