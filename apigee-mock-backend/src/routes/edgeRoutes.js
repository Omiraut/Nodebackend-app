const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/edgeController");

const router = express.Router();

router.get("/large-response", asyncHandler(controller.largeResponse));
router.get("/malformed/json", asyncHandler(controller.malformedJson));
router.get("/malformed/xml", asyncHandler(controller.malformedXml));

module.exports = router;
