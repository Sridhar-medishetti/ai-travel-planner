"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrips(res.data);
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId) => {
    const confirmDelete = confirm("Are you sure you want to delete this trip?");

    if (!confirmDelete) return;

    try {
      setDeletingId(tripId);

      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTrips();
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete trip");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-xl text-slate-300">Loading your trips...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Trips</h1>
          <p className="text-slate-400 mt-1">
            Manage your AI-generated travel plans
          </p>
        </div>

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

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Total Trips</p>
          <h2 className="text-3xl font-bold">{trips.length}</h2>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">AI Itineraries</p>
          <h2 className="text-3xl font-bold">{trips.length}</h2>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl">
          <p className="text-slate-400">Saved Plans</p>
          <h2 className="text-3xl font-bold">{trips.length}</h2>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">No trips found yet</h2>
          <p className="text-slate-400 mb-5">
            Create your first AI-generated itinerary.
          </p>

          <a
            href="/create-trip"
            className="bg-blue-600 px-5 py-3 rounded-lg inline-block hover:bg-blue-700"
          >
            Create Your First Trip
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-slate-800 p-6 rounded-xl">
              <div className="flex justify-between gap-4 mb-3">
                <h2 className="text-2xl font-semibold">
                  {trip.destination}
                </h2>

                <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                  {trip.budgetType}
                </span>
              </div>

              <p className="text-slate-300">Days: {trip.numberOfDays}</p>

              <p className="text-slate-300 mt-1">
                Total Budget: {trip.budgetEstimate?.total || "N/A"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {trip.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-900/60 text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <a
                  href={`/trips/${trip._id}`}
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  View Details
                </a>

                <button
                  onClick={() => handleDelete(trip._id)}
                  disabled={deletingId === trip._id}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {deletingId === trip._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}