import Booking from "../model/booking.js";
import Show from "../model/Show.js";
import User from "../model/user.js";

export const isAdmin = async (req, res) => {
    try {
        return res.json({ success: true, isAdmin: true });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, isAdmin: false });
    }
};

// Get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const totalUser = await User.countDocuments();
        const activeShows = await Show.find({ showDateTime: { $gte: new Date() } })
            .populate("movie")
            .sort({ showDateTime: 1 });
        const bookings = await Booking.find({});

        const dashboardData = {
            totalBookings: bookings.length,
            totalUser,
            activeShows,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
        };

        return res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all shows
export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } })
            .populate("movie")
            .sort({ showDateTime: 1 });

        return res.json({ success: true, shows });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate("user")
            .populate({ path: "show", populate: { path: "movie" } })
            .sort({ createdAt: -1 });

        return res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};