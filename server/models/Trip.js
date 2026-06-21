const mongoose = require("mongoose");

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
      required: true,
    },
    itinerary: [
      {
        day: Number,
        activities: [String],
      },
    ],
    budgetEstimate: {
      flights: String,
      accommodation: String,
      food: String,
      activities: String,
      total: String,
    },
    hotels: [
      {
        name: String,
        type: String,
        description: String,
      },
    ],
    travelTips: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);