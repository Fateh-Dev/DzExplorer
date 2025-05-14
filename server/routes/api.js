const express = require("express");
const router = express.Router();

// Mount sub-routes
router.use("/trips", require("./trips"));
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));

module.exports = router;
