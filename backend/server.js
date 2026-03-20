import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import authRoute from './routes/auth.routes.js'
import itineraryRoute from './routes/itinerary.routes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://travelbee-frontend.onrender.com",
  credentials: true
}));
app.use(express.json());


connectDB();


app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});

app.use("/api/auth",authRoute)
app.use("/api/itinerary",itineraryRoute)

app.listen(PORT, () => {
  console.log('Server running ...')
});
