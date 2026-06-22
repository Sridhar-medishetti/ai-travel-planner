const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createTrip,
  getMyTrips,
  getTripById,
} = require("../controllers/tripController");

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getMyTrips);
router.get("/:id", protect, getTripById);

module.exports = router;    