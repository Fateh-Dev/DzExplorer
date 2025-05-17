const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

// Public routes
router.get("/", tripController.getAllTrips);
router.get("/details/:id", tripController.getTripById);
router.get("/with-pagination", tripController.getTripsWithPagination);
router.post("/view/:id", tripController.incrementViewCount);
// Protected routes
/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Trip created successfully
 */
router.post("/", authenticateToken, authorizeRole(["Agency", "Admin"]), tripController.createTrip);
router.put("/:id", authenticateToken, authorizeRole(["Agency", "Admin"]), tripController.updateTrip);
router.delete("/:id", authenticateToken, authorizeRole(["Agency", "Admin"]), tripController.deleteTrip);

module.exports = router;
