import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function askAi(userInput) {
  const { destination, days, travelers, budget, interests } = userInput;

  const totalDays = days || 3;

  const prompt = `

You are a professional travel planner.

Create a detailed travel itinerary in JSON format.

Trip Details:
Destination: ${destination}
Number of Days: ${days}
Budget: ${budget}
Travelers: ${travelers}
Interests: ${interests}

Instructions:

1. Each day MUST contain 4 to 5 activities.
2. Activities should be arranged in chronological order (morning to night).
3. Include a mix of:
   - Tourist attractions
   - Cultural places
   - Food experiences
   - Local markets
   - Sunset or evening spots.
4. Include breakfast, lunch, and dinner restaurant suggestions with real restaurant names.
5. Keep locations close to each other for the same day to reduce travel time.
6. Provide helpful travel tips.
7. Suggest famous local dishes.
8. Recommend good hotels based on the budget.

For each activity include:
- place
- best visiting time
- short description
- helpful tip
- food recommendation nearby

For hotels include:
- name
- area
- price range
- rating
- description

Also provide a budget breakdown including:
- stay
- food
- transport
- activities

Return ONLY valid JSON in this structure:

{
  "summary": "",
  "hotels": [
    {
      "name": "",
      "area": "",
      "price": "",
      "rating": "",
      "description": ""
    }
  ],
  "budgetBreakdown": {
    "stay": "",
    "food": "",
    "transport": "",
    "activities": ""
  },
  "itinerary": [
    {
      "day": 1,
      "title": "",
      "activities": [
        {
          "place": "",
          "time": "",
          "description": "",
          "tip": "",
          "food": ""
        }
      ]
    }
  ]
}

Important:
Return only pure JSON without markdown or explanations.
`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}
