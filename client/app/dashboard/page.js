"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrips(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load trips");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Trips</h1>

        <div className="flex gap-3">
          <a
            href="/create-trip"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Trip
          </a>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-slate-300">No trips found yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
            <a
  href="/create-trip"
  className="bg-green-600 px-5 py-3 rounded-lg inline-block mb-6"
>
  + Create Trip
</a>
          {trips.map((trip) => (
            <div key={trip._id} className="bg-slate-800 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">
                {trip.destination}
              </h2>

              <p className="text-slate-300">Days: {trip.numberOfDays}</p>
              <p className="text-slate-300">Budget: {trip.budgetType}</p>
              <p className="text-slate-300">
                Interests: {trip.interests?.join(", ")}
              </p>

              <a
                href={`/trips/${trip._id}`}
                className="inline-block mt-4 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}   