const express = require("express");
const router = express.Router();

// Mount sub-routes
router.use("/trips", require("./trips"));
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/profile", require("./profile"));
router.use("/wishlist", require("./wishlist"));
router.use("/comments", require("./comments"));

module.exports = router;
