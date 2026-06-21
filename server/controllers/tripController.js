

const Trip = require("../models/Trip");

const createTrip = async (req, res) => {
  try {
    const {
      destination,
      numberOfDays,
      budgetType,
      interests,
      itinerary,
      budgetEstimate,
      hotels,
      travelTips,
    } = req.body;

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      numberOfDays,
      budgetType,
      interests,
      itinerary,
      budgetEstimate,
      hotels,
      travelTips,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
};