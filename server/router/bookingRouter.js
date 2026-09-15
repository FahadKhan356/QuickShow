import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { createBooking, getOccupiedSeats, cancelBooking } from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", protectedRoute, createBooking);
bookingRouter.get("/seats/:showId", getOccupiedSeats);
bookingRouter.delete("/:bookingId", protectedRoute, cancelBooking);

export default bookingRouter;