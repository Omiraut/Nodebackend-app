const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/streamingController");

const router = express.Router();

router.get("/chunked", asyncHandler(controller.chunked));
router.get("/stream", asyncHandler(controller.stream));

module.exports = router;
