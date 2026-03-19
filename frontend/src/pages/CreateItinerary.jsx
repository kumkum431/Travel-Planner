import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bee from "../assets/bee.png";

const interestsList = [
  { label: "🍜 Food", value: "Food" },
  { label: "🎭 Culture", value: "Culture" },
  { label: "🌿 Nature", value: "Nature" },
  { label: "🧗 Adventure", value: "Adventure" },
  { label: "🛍️ Shopping", value: "Shopping" },
  { label: "🌙 Nightlife", value: "Nightlife" },
  { label: "🏛️ History", value: "History" },
  { label: "🏖️ Beaches", value: "Beaches" },
];

export default function CreateItinerary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  function toggleInterest(value) {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      destination: e.target.destination.value,
      days: e.target.days.value,
      travelers: e.target.travelers.value,
      budget: e.target.budget.value,
      interests: selectedInterests,
    };

    try {
      const res = await axios.post(
        "https://travelbee-ai-planner.onrender.com/api/itinerary/",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      navigate(`/itinerary/${res.data.data._id}`);
    } catch (error) {
      alert("Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-orange-400 via-amber-200 to-orange-500 pt-28 px-10 pb-24 text-slate-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-20 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-300 opacity-30 rounded-full blur-2xl translate-y-16 -translate-x-16 pointer-events-none" />

      <h1 className="text-5xl font-bold mb-2 tracking-wide subHeading-font leading-tight drop-shadow-sm text-center">
        Plan Your Dream Trip
        <span className="text-orange-700"> with TravelBee</span>
      </h1>

      <img
        src={bee}
        alt="travelbee"
        className="hidden absolute top-10 left-180 md:block h-25 drop-shadow-md"
      />

      <p className="text-gray-700 font-semibold first-font mb-10 text-base tracking-wide text-center">
        Pack your bags — let AI do the planning ✈️
      </p>

      <div className="relative bg-amber-100 border border-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block mb-1.5 font-bold text-sm uppercase tracking-wider text-orange-700">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              placeholder="Enter city (e.g. Manali, London)"
              className="w-full border-2 border-orange-200 rounded-xl py-2.5 px-5 outline-none placeholder:text-sm placeholder:text-gray-500 bg-white/80 focus:bg-orange-50 focus:border-orange-400 transition-all "
              required
            />
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex-1 min-w-30">
              <label className="block mb-1.5 font-bold text-sm uppercase tracking-wider text-orange-700">
                Days
              </label>
              <input
                type="number"
                name="days"
                min="1"
                placeholder="2"
                required
                className="w-full border-2 border-orange-200 rounded-xl py-2.5 px-5 outline-none placeholder:text-gray-500 bg-white/80 focus:bg-orange-50 focus:border-orange-400 transition-all "
              />
            </div>
            <div className="flex-1 min-w-30">
              <label className="block mb-1.5 font-bold text-sm uppercase tracking-wider text-orange-700">
                Travelers
              </label>
              <input
                type="number"
                name="travelers"
                min="1"
                placeholder="2"
                required
                className="w-full border-2 border-orange-200 rounded-xl py-2.5 px-5 outline-none placeholder:text-gray-500 bg-white/80 focus:bg-orange-50 focus:border-orange-400 transition-all "
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 font-bold uppercase text-sm tracking-wider text-orange-700">
              Budget (INR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                name="budget"
                placeholder="e.g. 50000"
                required
                className="w-full border-2 border-orange-200 rounded-xl py-2.5 pl-9 pr-5 outline-none placeholder:text-sm placeholder:text-gray-500 bg-white/80 focus:bg-orange-50 focus:border-orange-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-orange-700">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interestsList.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleInterest(item.value)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 ${
                    selectedInterests.includes(item.value)
                      ? "bg-orange-500 border-orange-600 text-white scale-105"
                      : "bg-white border-orange-200 text-slate-700 hover:border-orange-400 hover:bg-orange-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-orange-500 text-white py-3 rounded-2xl font-semibold tracking-wide hover:bg-orange-600 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Planning your trip...</span>
            ) : (
              "Generate Itinerary 🐝"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
