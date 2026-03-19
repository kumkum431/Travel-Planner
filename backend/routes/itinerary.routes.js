import { Router } from "express";
import {
  createItinerary,
  getAllItinerary,
  getSingleItinerary,
  updateItinerary,
  saveItinerary,
  deleteItinerary,
} from "../controllers/itinerary.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.patch("/:id", protect, saveItinerary);
router.get("/", protect, getAllItinerary);
router.get("/:id", protect, getSingleItinerary);
router.post("/", protect, createItinerary);
router.delete("/:id", protect, deleteItinerary);

export default router;
