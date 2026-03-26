const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/payloadController");

const router = express.Router();

router.post("/payload/json", asyncHandler(controller.payloadJson));
router.post("/payload/xml", asyncHandler(controller.payloadXml));
router.post("/payload/form", asyncHandler(controller.payloadForm));
router.post("/payload/multipart", asyncHandler(controller.payloadMultipart));
router.post("/payload/binary", asyncHandler(controller.payloadBinary));

module.exports = router;
