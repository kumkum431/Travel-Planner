import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewItinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    fetchItinerary();
  }, [id]);

  async function fetchItinerary() {
    try {
      const res = await axios.get(`https://travelbee-ai-planner.onrender.com/api/itinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItinerary(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching itinerary:", err);
    }
  }

  if (!itinerary)
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-300 via-amber-200 to-orange-400 flex items-center justify-center">
        <p className="text-center text-xl font-bold text-orange-800 animate-pulse tracking-wide">
          🐝 Planning your trip...
        </p>
      </div>
    );

  async function handleSave() {
    try {
      await axios.patch(
        `https://travelbee-ai-planner.onrender.com/api/itinerary/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Saved Successfully ✅");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-orange-400 via-orange-300 to-orange-500  px-4 py-20 overflow-hidden">
      <div className="bg-white/60 border-2 rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-wide  subHeading-font mb-3">
          ✈️ Trip to
          <span className="text-orange-600 uppercase subHeading-font">
            {" "}
            {itinerary.destination}
          </span>
        </h1>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          {itinerary.summary}
        </p>
      </div>

      <div className="grid grid-cols-3 bg-white/60 border-2 rounded-xl mt-5 p-6 text-center">
        <div>
          <p className="text-orange-600 text-sm uppercase tracking-wide font-semibold mb-1">
            Duration
          </p>
          <p className="font-bold text-lg text-slate-800">
            📅 {itinerary.days} Days
          </p>
        </div>
        <div>
          <p className="text-orange-600 text-sm uppercase tracking-wide font-semibold mb-1">
            Budget
          </p>
          <p className="font-bold text-lg text-slate-800">
            💰 ₹{itinerary.budget}
          </p>
        </div>
        <div>
          <p className="text-orange-600 text-sm uppercase tracking-wide font-semibold mb-1">
            Group Size
          </p>
          <p className="font-bold text-lg text-slate-800">
            👥 {itinerary.travelers}
          </p>
        </div>
      </div>
      <br />
      <hr />
      {itinerary.hotels && itinerary.hotels.length > 0 && (
        <div>
          <h2 className="text-2xl first-font font-bold mt-5 mb-5 flex items-center gap-2">
            🏨 Recommended Stays
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {itinerary.hotels.map((hotel, index) => (
              <div key={index} className="bg-white/70 border-2 p-6 rounded-xl ">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800">
                    {hotel.name}
                  </h3>
                </div>
                <p className="text-orange-500 text-sm font-semibold mb-3">
                  📍 {hotel.address || hotel.area}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {hotel.description}
                </p>
                {hotel.mapLink && (
                  <a
                    href={hotel.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 text-sm font-bold hover:text-orange-800 flex items-center gap-1 transition"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      <hr />

      <div className="space-y-10 mt-5">
        {itinerary.itinerary.map((day) => (
          <div key={day.day}>
            <div className="flex items-center gap-4 mb-5">
              <span className="bg-orange-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-base shadow-md shadow-orange-300">
                {day.day}
              </span>
              <h2 className="text-2xl font-bold first-font ">{day.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {day.activities.map((activity, i) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-sm flex justify-between h-75 flex-col p-6 rounded-xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-400 to-amber-300 rounded-l-2xl" />

                  <div className=" flex justify-between items-center mb-2">
                    <h3 className="text-lg first-font font-bold text-slate-800">
                      {activity.place}
                    </h3>
                    <span className="text-xs font-bold text-gray-600 bg-orange-50 border-2 px-2 py-0.5 rounded-lg">
                      ⏰ {activity.time}
                    </span>
                  </div>

                  <p className="text-gray-900 text-[15px] mb-4">
                    {activity.description}
                  </p>

                  <div className="space-y-2 bg-orange-50 border p-3 rounded-xl mb-4">
                    <p className="text-sm text-green-700 font-semibold">
                      <strong>💡 Tip:</strong> {activity.tip}
                    </p>
                    <p className="text-sm text-orange-700">
                      <strong>🍜 Food:</strong> {activity.food}
                    </p>
                  </div>

                  {activity.mapLink && (
                    <a
                      href={activity.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block w-full text-center py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl text-sm font-semibold transition border border-orange-400"
                    >
                      📍 Open in Maps
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition mb-5"
      >
        💾 Save Itinerary
      </button>
    </div>
  );
}
