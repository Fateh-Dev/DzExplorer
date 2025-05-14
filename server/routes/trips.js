const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Operations related to trips
 */

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get trips with pagination
 *     tags: [Trips]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: true
 *         description: Number of trips per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A paginated list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trips:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trip'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get("/", tripController.getAllTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get a specific trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the trip to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A trip object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         description: Trip not found
 */
router.get("/details/:id", tripController.getTripById);

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
router.post("", tripController.createTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the trip to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       200:
 *         description: Updated trip
 *       404:
 *         description: Trip not found
 */
router.put("/:id", tripController.updateTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the trip to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       404:
 *         description: Trip not found
 */
router.delete("/:id", tripController.deleteTrip);

/**
 * @swagger
 * /api/trips-with-pagination:
 *   get:
 *     summary: Get trips with pagination
 *     tags: [Trips]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: true
 *         description: Number of trips per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A paginated list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trips:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trip'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get("/with-pagination", tripController.getTripsWithPagination);
module.exports = router;
