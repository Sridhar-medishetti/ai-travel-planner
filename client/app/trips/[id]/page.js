"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";

export default function TripDetailsPage({ params }) {
  const { id } = use(params);

  const [trip, setTrip] = useState(null);
  const [dayNumber, setDayNumber] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activityDay, setActivityDay] = useState("");
  const [newActivity, setNewActivity] = useState("");

  useEffect(() => {
    fetchTrip();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTrip = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/trips/${id}`,
        getAuthHeaders()
      );

      setTrip(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load trip");
    }
  };

  const handleRegenerateDay = async () => {
    if (!dayNumber || !prompt) {
      alert("Please enter day number and prompt");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/trips/${id}/regenerate-day`,
        {
          day: Number(dayNumber),
          prompt,
        },
        getAuthHeaders()
      );

      setTrip(res.data);
      setDayNumber("");
      setPrompt("");

      alert("Day regenerated successfully");
    } catch (error) {
  console.error(error.response?.data || error);
  alert(error.response?.data?.message || "Failed to regenerate day");
}
  };

  const handleAddActivity = async () => {
    if (!activityDay || !newActivity) {
      alert("Please enter day number and activity");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/trips/${id}/add-activity`,
        {
          day: Number(activityDay),
          activity: newActivity,
        },
        getAuthHeaders()
      );

      setTrip(res.data);
      setActivityDay("");
      setNewActivity("");

      alert("Activity added successfully");
    } catch (error) {
  console.error(error.response?.data || error);
  alert(error.response?.data?.message || "Failed to add activity");
}
  };

  const handleRemoveActivity = async (day, activityIndex) => {
    const confirmRemove = confirm("Remove this activity?");

    if (!confirmRemove) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/trips/${id}/remove-activity`,
        {
          day,
          activityIndex,
        },
        getAuthHeaders()
      );

      setTrip(res.data);
      alert("Activity removed successfully");
    } catch (error) {
  console.error(error.response?.data || error);
  alert(error.response?.data?.message || "Failed to remove activity");
}
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        Loading trip...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <a href="/dashboard" className="text-blue-400">
        ← Back to Dashboard
      </a>

      <h1 className="text-4xl font-bold mt-6 mb-2">
        {trip.destination}
      </h1>

      <p className="text-slate-300 mb-8">
        {trip.numberOfDays} days · {trip.budgetType} budget
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Regenerate Itinerary Day
          </h2>

          <input
            type="number"
            placeholder="Day Number"
            value={dayNumber}
            onChange={(e) => setDayNumber(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-3"
          />

          <input
            type="text"
            placeholder="Example: More outdoor activities"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-3"
          />

          <button
            onClick={handleRegenerateDay}
            className="bg-purple-600 px-5 py-3 rounded-lg hover:bg-purple-700"
          >
            Regenerate Day
          </button>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Add Activity
          </h2>

          <input
            type="number"
            placeholder="Day Number"
            value={activityDay}
            onChange={(e) => setActivityDay(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-3"
          />

          <input
            type="text"
            placeholder="Example: Visit Eiffel Tower"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-3"
          />

          <button
            onClick={handleAddActivity}
            className="bg-green-600 px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Add Activity
          </button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>

        {trip.itinerary?.map((day) => (
          <div key={day.day} className="bg-slate-800 p-5 rounded-xl mb-4">
            <h3 className="text-xl font-semibold mb-3">
              Day {day.day}
            </h3>

            <ul className="space-y-2">
              {day.activities?.map((activity, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-slate-700 p-3 rounded"
                >
                  <span>{activity}</span>

                  <button
                    onClick={() => handleRemoveActivity(day.day, index)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Estimated Budget
        </h2>

        <div className="bg-slate-800 p-5 rounded-xl">
          <p>Flights: {trip.budgetEstimate?.flights}</p>
          <p>Accommodation: {trip.budgetEstimate?.accommodation}</p>
          <p>Food: {trip.budgetEstimate?.food}</p>
          <p>Activities: {trip.budgetEstimate?.activities}</p>
          <p className="font-bold mt-2">
            Total: {trip.budgetEstimate?.total}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Recommended Hotels
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {trip.hotels?.map((hotel, index) => (
            <div
              key={index}
              className="bg-slate-800 p-5 rounded-xl"
            >
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <p className="text-blue-400">{hotel.hotelType}</p>
              <p className="text-slate-300 mt-2">
                {hotel.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Travel Tips
        </h2>

        <ul className="bg-slate-800 p-5 rounded-xl list-disc pl-8">
          {trip.travelTips?.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}