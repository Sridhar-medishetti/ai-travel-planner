const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTripPlan = async ({
  destination,
  numberOfDays,
  budgetType,
  interests,
}) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are an AI travel planning assistant.

Create a personalized travel plan for:
Destination: ${destination}
Number of Days: ${numberOfDays}
Budget Type: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON with:
{
  "itinerary": [
    {
      "day": 1,
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ],
  "budgetEstimate": {
    "flights": "$400",
    "accommodation": "$300",
    "food": "$150",
    "activities": "$100",
    "total": "$950"
  },
  "hotels": [
    {
      "name": "Hotel Name",
      "type": "Budget Friendly / Mid Range / Luxury",
      "description": "Short reason why this hotel is suitable"
    }
  ],
  "travelTips": [
    "Packing tip",
    "Safety tip",
    "Local etiquette tip"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.log("Gemini failed, using fallback response:", error.status || error.message);

    return {
      itinerary: Array.from({ length: numberOfDays }, (_, index) => ({
        day: index + 1,
        activities: [
          `Explore top attractions in ${destination}`,
          `Try local food based on interests: ${interests.join(", ")}`,
          `Enjoy a ${budgetType.toLowerCase()} budget-friendly evening activity`,
        ],
      })),
      budgetEstimate: {
        flights: "$400",
        accommodation: budgetType === "Low" ? "$200" : budgetType === "Medium" ? "$400" : "$800",
        food: budgetType === "Low" ? "$100" : budgetType === "Medium" ? "$200" : "$400",
        activities: budgetType === "Low" ? "$80" : budgetType === "Medium" ? "$180" : "$350",
        total: budgetType === "Low" ? "$780" : budgetType === "Medium" ? "$1180" : "$1950",
      },
      hotels: [
        {
          name: `${destination} Budget Stay`,
          hotelType: "Budget Friendly",
          description: "Affordable option suitable for low-budget travelers.",
        },
        {
          name: `${destination} Central Hotel`,
          hotelType: "Mid Range",
          description: "Balanced comfort and location for most travelers.",
        },
        {
          name: `${destination} Luxury Palace`,
          hotelType: "Luxury",
          description: "Premium stay option for high-budget travelers.",
        },
      ],
      travelTips: [
        `Carry comfortable shoes for exploring ${destination}.`,
        "Keep digital and physical copies of important documents.",
        `Plan activities around your interests: ${interests.join(", ")}.`,
      ],
    };
  }
};

module.exports = generateTripPlan;