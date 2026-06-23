import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4">
        AI Travel Planner
      </h1>

      <p className="text-slate-300 text-lg mb-8 text-center max-w-xl">
        Generate personalized travel itineraries using AI, manage trips,
        estimate budgets, discover hotels, and customize your travel experience.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </main>
  );
}