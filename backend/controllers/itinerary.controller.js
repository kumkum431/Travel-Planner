import askAi from "../utils/askAi.js";
import Itinerary from "../models/itinerary.model.js";
import getPlacePhoto from "../utils/placePhoto.js";

// Creating itinerary

export async function createItinerary(req, res) {
  try {
    console.log("Request received for:", req.body.destination);

    const aiResponse = await askAi(req.body);
    console.log("AI Response received");

    let parsedResponse;

    try {
      const cleanJson =
        typeof aiResponse === "string"
          ? aiResponse.replace(/```json|```/g, "").trim()
          : aiResponse;

      parsedResponse =
        typeof cleanJson === "string" ? JSON.parse(cleanJson) : cleanJson;
    } catch (err) {
      console.error("JSON Parse Error:", err);
      return res.status(400).json({
        success: false,
        message: "AI returned invalid JSON format",
      });
    }

    await Promise.all(
      (parsedResponse.hotels || []).map(async (hotel) => {
        const hotelDetails = await getPlacePhoto(hotel.name);

        if (hotelDetails) {
          hotel.photo = hotelDetails.photo;
          hotel.mapLink = hotelDetails.mapLink;
          hotel.address = hotelDetails.address;
        }
      }),
    );
    for (const day of parsedResponse.itinerary || []) {
      await Promise.all(
        (day.activities || []).map(async (activity) => {
          const placeDetails = await getPlacePhoto(activity.place);

          if (placeDetails) {
            activity.photo = placeDetails.photo;
            activity.mapLink = placeDetails.mapLink;
            activity.address = placeDetails.address;
          }
        }),
      );
    }

    const itineraryData = {
      userId: req.user.id,
      destination: req.body.destination,
      days: req.body.days,
      budget: req.body.budget,
      travelers: req.body.travelers,
      interests: req.body.interests,
      summary: parsedResponse.summary,
      hotels: parsedResponse.hotels,
      itinerary: parsedResponse.itinerary,
      budgetBreakdown: parsedResponse.budgetBreakdown,
      raw_ai_response: parsedResponse,
    };

    const savedItinerary = await Itinerary.create(itineraryData);

    res.status(201).json({
      success: true,
      data: savedItinerary,
    });
  } catch (error) {
    console.error("ITINERARY ERROR ❌", error);

    if (error.status === 503 || error.message?.includes("503")) {
      return res.status(503).json({
        success: false,
        message:
          "Travel AI is currently busy. Please try again in a few seconds.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate itinerary",
    });
  }
}

// Get single itinerary
export async function getSingleItinerary(req, res) {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }
    res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    console.error("GET SINGLE ERROR ❌", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch itinerary",
    });
  }
}

// get all itineraries
export async function getAllItinerary(req, res) {
  try {
    const itineraries = await Itinerary.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: itineraries,
    });
  } catch (error) {
    console.error("GET ALL ERROR ❌", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch itineraries",
    });
  }
}


// save itinerary
export async function saveItinerary(req, res) {
  try {
    const itinerary = await Itinerary.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { isSaved: true },
      { new: true },
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Itinerary saved successfully",
      data: itinerary,
    });
  } catch (error) {
    console.error("SAVE ERROR ❌", error);
    res.status(500).json({
      success: false,
      message: "Failed to save itinerary",
    });
  }
}

// delete itinerary
export async function deleteItinerary(req, res) {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Itinerary deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR ❌", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete itinerary",
    });
  }
}
