const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/successController");

const router = express.Router();

router.get("/success/json", asyncHandler(controller.successJson));
router.get("/success/xml", asyncHandler(controller.successXml));
router.get("/success/text", asyncHandler(controller.successText));
router.get("/success/large", asyncHandler(controller.successLarge));

module.exports = router;
