const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/delayController");

const router = express.Router();

router.get("/delay/:ms", asyncHandler(controller.delayByParam));
router.get("/timeout", asyncHandler(controller.timeoutSimulation));

module.exports = router;
