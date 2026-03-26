const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/errorController");

const router = express.Router();

router.get("/error/400", asyncHandler(controller.error400));
router.get("/error/401", asyncHandler(controller.error401));
router.get("/error/403", asyncHandler(controller.error403));
router.get("/error/404", asyncHandler(controller.error404));
router.get("/error/500", asyncHandler(controller.error500));
router.get("/error/502", asyncHandler(controller.error502));
router.get("/error/503", asyncHandler(controller.error503));

module.exports = router;
