import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    place: String,
    time: String,
    description: String,
    tip: String,
    food: String,
    photo: String,
    mapLink: String,
    rating: Number,
  },
  { _id: false },
);

const DaySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    activities: [ActivitySchema],
  },
  { _id: false },
);

const HotelSchema = new mongoose.Schema(
  {
    name: String,
    area: String,
    price: String,
    description: String,
    photo: String,
    mapLink: String,
  },
  { _id: false },
);

const ItinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: String,
    days: Number,
    budget: Number,
    travelers: String,
    interests: [String],
    summary: String,
    hotels: [HotelSchema],
    itinerary: [DaySchema],
    isSaved: {
      type: Boolean,
      default: false,
    },
    raw_ai_response: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

export default mongoose.model("Itinerary", ItinerarySchema);
