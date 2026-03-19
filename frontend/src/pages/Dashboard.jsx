import React, { useEffect, useState } from "react";
import axios from "axios";
import sadbee from "../assets/sadbee.png";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {
    try {
      const res = await axios.get("http://localhost:5500/api/itinerary/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("DATA:", res.data.data);
      setTrips(res.data.data.filter((trip) => trip.isSaved));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5500/api/itinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-400 via-amber-200 to-orange-500 py-10 ">
      <div className="relative max-w-6xl m-10">
        <div className="mb-5 subHeading-font ">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-wide">
            📌 Saved <span className="text-orange-600">Itineraries</span>
          </h1>
          <p className="text-gray-800 text-lg font-semibold mt-1 tracking-wide">
            All your planned adventures in one place🐝
          </p>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white/60 relative rounded-xl p-15 border-2 flex flex-col items-center justify-center text-center">
            <img
              src={sadbee}
              alt="travelBee"
              className="absolute h-25 -top-1"
            />
            <h2 className="text-2xl font-bold text-slate-800 second-font mt-5">
              No saved trips yet!
            </h2>
            <p className="text-[16px] font-semibold text-slate-700 mt-2 max-w-sm">
              Looks like you haven't saved any itineraries. Start planning your
              next adventure!
            </p>
            <button
              onClick={() => navigate("/create")}
              className="bg-orange-500 mt-6 text-white px-6 py-2.5 rounded-xl font-bold text-[16px] tracking-wide hover:bg-orange-600 active:scale-95 transition-all "
            >
              ✈️ Plan a Trip
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                onClick={() => navigate(`/itinerary/${trip._id}`)}
                className="bg-white/70 backdrop-blur-sm border-2 p-6 rounded-xl transition-all duration-200 relative overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-3 first-font hover:text-orange-600 underline underline-offset-2 transition-colors">
                  Trip to <span className="uppercase">{trip.destination}</span>
                </h2>

                <div className="flex gap-3 mb-5">
                  <span className="bg-orange-50 text-orange-600 text-sm border border-black rounded font-semibold px-3 py-1 ">
                    📅 {trip.days} Days
                  </span>
                  <span className="bg-amber-50 text-orange-600 text-sm border border-black rounded font-semibold px-3 py-1 ">
                    💰 ₹{trip.budget}
                  </span>
                  <span className="bg-amber-50 text-orange-600 text-sm border border-black rounded font-semibold px-3 py-1 ">
                    👥 {trip.travelers}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(trip._id);
                  }}
                  className="w-full py-2 bg-red-300 border text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
