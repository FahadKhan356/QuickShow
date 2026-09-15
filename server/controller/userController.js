import { clerkClient, getAuth } from "@clerk/express";
import Booking from "../model/booking.js";
import Movie from "../model/Movie.js";

// Get all bookings of the logged-in user
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

        const bookings = await Booking.find({ user: userId })
            .populate({ path: "show", populate: { path: "movie" } })
            .sort({ createdAt: -1 });

        return res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Add/remove a movie from the user's favorites (stored in Clerk privateMetadata)
export const updateFavorite = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

        const { movieId } = req.body;
        if (!movieId) return res.status(400).json({ success: false, message: "movieId is required" });

        const user = await clerkClient.users.getUser(userId);

        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        if (!user.privateMetadata.favorites.includes(movieId)) {
            user.privateMetadata.favorites.push(movieId);
        } else {
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter((item) => item !== movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: user.privateMetadata });

        return res.json({ success: true, message: "Favorite updated successfully", favorites: user.privateMetadata.favorites });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get the list of favorite movies of the logged-in user
export const getFavorites = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata.favorites || [];

        let movies = [];
        if (favorites.length > 0) {
            movies = await Movie.find({ _id: { $in: favorites } });
        }

        return res.json({ success: true, favorites, movies });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};