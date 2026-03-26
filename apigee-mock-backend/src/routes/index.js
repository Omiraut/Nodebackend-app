const express = require("express");
const successRoutes = require("./successRoutes");
const errorRoutes = require("./errorRoutes");
const validationRoutes = require("./validationRoutes");
const authRoutes = require("./authRoutes");
const cacheRoutes = require("./cacheRoutes");
const payloadRoutes = require("./payloadRoutes");
const delayRoutes = require("./delayRoutes");
const chaosRoutes = require("./chaosRoutes");
const streamingRoutes = require("./streamingRoutes");
const edgeRoutes = require("./edgeRoutes");

const router = express.Router();

router.use(successRoutes);
router.use(errorRoutes);
router.use(validationRoutes);
router.use(authRoutes);
router.use(cacheRoutes);
router.use(payloadRoutes);
router.use(delayRoutes);
router.use(chaosRoutes);
router.use(streamingRoutes);
router.use(edgeRoutes);

module.exports = router;
