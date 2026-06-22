const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
  addActivity,
  removeActivity,
  regenerateDay,
} = require("../controllers/tripController");

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getMyTrips);
router.get("/:id", protect, getTripById);
router.delete("/:id", protect, deleteTrip);

router.put("/:id/add-activity", protect, addActivity);
router.put("/:id/remove-activity", protect, removeActivity);
router.put("/:id/regenerate-day", protect, regenerateDay);

module.exports = router;