const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/validationController");
const validation = require("../middleware/validation");

const router = express.Router();

router.get("/validate/query", validation.validateQuery, asyncHandler(controller.validateQuery));
router.post("/validate/json", validation.validateBody, asyncHandler(controller.validateJson));
router.post("/validate/nested", validation.validateNested, asyncHandler(controller.validateNested));
router.post("/validate/headers", validation.validateHeaders, asyncHandler(controller.validateHeaders));
router.post("/validate/xml", validation.validateXML, asyncHandler(controller.validateXml));
router.post("/validate/form", validation.validateForm, asyncHandler(controller.validateForm));
router.post(
  "/validate/multipart",
  validation.validateMultipart,
  asyncHandler(controller.validateMultipart)
);

module.exports = router;
