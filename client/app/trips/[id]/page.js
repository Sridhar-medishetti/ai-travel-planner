"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";

export default function TripDetailsPage({ params }) {
  const { id } = use(params);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrip(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load trip");
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

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>

        {trip.itinerary?.map((day) => (
          <div key={day.day} className="bg-slate-800 p-5 rounded-xl mb-4">
            <h3 className="text-xl font-semibold mb-3">Day {day.day}</h3>

            <ul className="list-disc pl-5 space-y-2">
              {day.activities?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estimated Budget</h2>

        <div className="bg-slate-800 p-5 rounded-xl">
          <p>Flights: {trip.budgetEstimate?.flights}</p>
          <p>Accommodation: {trip.budgetEstimate?.accommodation}</p>
          <p>Food: {trip.budgetEstimate?.food}</p>
          <p>Activities: {trip.budgetEstimate?.activities}</p>
          <p className="font-bold mt-2">Total: {trip.budgetEstimate?.total}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Hotels</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {trip.hotels?.map((hotel, index) => (
            <div key={index} className="bg-slate-800 p-5 rounded-xl">
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <p className="text-blue-400">{hotel.hotelType}</p>
              <p className="text-slate-300 mt-2">{hotel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>

        <ul className="bg-slate-800 p-5 rounded-xl list-disc pl-8">
          {trip.travelTips?.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}