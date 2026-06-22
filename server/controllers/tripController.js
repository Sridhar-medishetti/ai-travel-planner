const Trip = require("../models/Trip");
const generateTripPlan = require("../utils/geminiService");

// Create trip using AI/fallback response
const createTrip = async (req, res) => {
  try {
    const { destination, numberOfDays, budgetType, interests } = req.body;

    const aiTripData = await generateTripPlan({
      destination,
      numberOfDays,
      budgetType,
      interests,
    });

    

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      numberOfDays,
      budgetType,
      interests,
      itinerary: Array.isArray(aiTripData.itinerary)
        ? aiTripData.itinerary
        : [],
      budgetEstimate: aiTripData.budgetEstimate || {},
      hotels: Array.isArray(aiTripData.hotels)
        ? aiTripData.hotels
        : [],
      travelTips: Array.isArray(aiTripData.travelTips)
        ? aiTripData.travelTips
        : [],
    });

   

    res.status(201).json(trip);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate trip",
      error: error.message,
    });
  }
};

// Get all trips of logged-in user
const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single trip of logged-in user
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
};