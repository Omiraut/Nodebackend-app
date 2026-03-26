const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/chaosController");

const router = express.Router();

router.get("/random-status", asyncHandler(controller.randomStatus));
router.get("/random-failure", asyncHandler(controller.randomFailure));
router.get("/random-delay", asyncHandler(controller.randomDelayEndpoint));

module.exports = router;
