const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/cacheController");

const router = express.Router();

router.get("/cacheable", asyncHandler(controller.cacheable));
router.get("/non-cacheable", asyncHandler(controller.nonCacheable));
router.get("/ratelimit-test", asyncHandler(controller.ratelimitTest));
router.get("/spike-test", asyncHandler(controller.spikeTest));

module.exports = router;
