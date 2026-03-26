const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/authController");

const router = express.Router();

router.get("/auth/apikey-required", asyncHandler(controller.apikeyRequired));
router.get("/auth/jwt-required", asyncHandler(controller.jwtRequired));
router.get("/auth/token-required", asyncHandler(controller.tokenRequired));

module.exports = router;
