const { sleep } = require("../utils/helpers");

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function randomDelay(minMs, maxMs) {
  const delayMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await sleep(delayMs);
  return delayMs;
}

function buildLargeArray(size) {
  return Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    value: `item-${index + 1}`
  }));
}

module.exports = {
  pickRandom,
  randomDelay,
  buildLargeArray
};
