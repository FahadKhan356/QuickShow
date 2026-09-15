import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { getFavorites, getUserBookings, updateFavorite } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/bookings", protectedRoute, getUserBookings);
userRouter.get("/favorites", protectedRoute, getFavorites);
userRouter.post("/update-favorites", protectedRoute, updateFavorite);

export default userRouter;