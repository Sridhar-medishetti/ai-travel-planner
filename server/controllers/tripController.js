const Trip = require("../models/Trip");
const generateTripPlan = require("../utils/geminiService");

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
      itinerary: Array.isArray(aiTripData.itinerary) ? aiTripData.itinerary : [],
      budgetEstimate: aiTripData.budgetEstimate || {},
      hotels: Array.isArray(aiTripData.hotels) ? aiTripData.hotels : [],
      travelTips: Array.isArray(aiTripData.travelTips) ? aiTripData.travelTips : [],
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate trip",
      error: error.message,
    });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

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

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addActivity = async (req, res) => {
  try {
    const { day, activity } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const selectedDay = trip.itinerary.find(
      (item) => item.day === Number(day)
    );

    if (!selectedDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    selectedDay.activities.push(activity);

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeActivity = async (req, res) => {
  try {
    const { day, activityIndex } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const selectedDay = trip.itinerary.find(
      (item) => item.day === Number(day)
    );

    if (!selectedDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    selectedDay.activities.splice(activityIndex, 1);

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const regenerateDay = async (req, res) => {
  try {
    const { day, prompt } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const selectedDay = trip.itinerary.find(
      (item) => item.day === Number(day)
    );

    if (!selectedDay) {
      return res.status(404).json({ message: "Day not found" });
    }

    selectedDay.activities = [
      `Regenerated activity for Day ${day}: ${prompt}`,
      `Explore another ${trip.destination} attraction`,
      `Enjoy a personalized experience based on ${trip.interests.join(", ")}`,
    ];

    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
  addActivity,
  removeActivity,
  regenerateDay,
};