const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    hotelType: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
    },
    activities: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    numberOfDays: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: [itinerarySchema],
      default: [],
    },

    budgetEstimate: {
      flights: String,
      accommodation: String,
      food: String,
      activities: String,
      total: String,
    },

    hotels: {
      type: [hotelSchema],
      default: [],
    },

    travelTips: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);