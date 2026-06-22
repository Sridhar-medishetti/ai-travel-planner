"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [budgetType, setBudgetType] = useState("Medium");
  const [interests, setInterests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/trips",
        {
          destination,
          numberOfDays: Number(numberOfDays),
          budgetType,
          interests: interests
            .split(",")
            .map((item) => item.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Trip Created Successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create trip");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-6">
          Create New Trip
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
            required
          />

          <input
            type="number"
            placeholder="Number of Days"
            value={numberOfDays}
            onChange={(e) =>
              setNumberOfDays(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
            required
          />

          <select
            value={budgetType}
            onChange={(e) =>
              setBudgetType(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="text"
            placeholder="Food, Culture, Shopping"
            value={interests}
            onChange={(e) =>
              setInterests(e.target.value)
            }
            className="w-full p-3 rounded bg-slate-800"
          />

          <button
            className="w-full bg-green-600 py-3 rounded-lg font-semibold"
          >
            Generate Trip
          </button>
        </form>
      </div>
    </div>
  );
}