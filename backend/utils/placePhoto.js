import axios from "axios";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function getPlaceDetails(placeName) {
  if (!placeName) return getDefaultResult(placeName);

  try {
    const searchResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: placeName,
          key: API_KEY,
        },
      }
    );

    const place = searchResponse.data?.results?.[0];

    if (!place) return getDefaultResult(placeName);

    return {
      // Photo property removed
      mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`,
      address: place.formatted_address || "",
      rating: place.rating || "N/A",
      userRatingCount: place.user_ratings_total || 0,
    };
  } catch (error) {
    console.error(`Error:`, error.message);
    return getDefaultResult(placeName);
  }
}

function getDefaultResult(placeName) {
  return {
    mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName || "")}`,
    address: "",
    rating: "N/A",
    userRatingCount: 0,
  };
}