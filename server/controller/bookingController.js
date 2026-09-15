import { getAuth } from "@clerk/express";
import Booking from "../model/booking.js";
import Show from "../model/Show.js";

// function to check availability of selected seats for a show
const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) return false;

        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

export const createBooking = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

        const { showId, selectedSeats } = req.body;

        if (!showId || !selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            return res.status(400).json({ success: false, message: "showId and selectedSeats are required" });
        }

        // Check if seats are available
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.status(409).json({ success: false, message: "Selected seats are not available" });
        }

        const showData = await Show.findById(showId).populate("movie");
        if (!showData) return res.status(404).json({ success: false, message: "Show not found" });

        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookingSeats: selectedSeats,
        });

        // Mark the seats as occupied by this user
        selectedSeats.forEach((seat) => {
            showData.occupiedSeats[seat] = userId;
        });
        showData.markModified("occupiedSeats");
        await showData.save();

        // TODO: Integrate Stripe payment here, generate a payment link,
        // store it on the booking (paymentLink) and mark isPaid once paid.

        return res.status(201).json({ success: true, message: "Booked successfully", bookingId: booking._id });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get occupied seats for a show
export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;

        const showData = await Show.findById(showId);
        if (!showData) return res.status(404).json({ success: false, message: "Show not found" });

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        return res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel a booking and free up the seats
export const cancelBooking = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        // Only the owner can cancel their own booking
        if (booking.user !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized" });
        }

        // Release the occupied seats
        const showData = await Show.findById(booking.show);
        if (showData) {
            booking.bookingSeats.forEach((seat) => {
                if (showData.occupiedSeats[seat] === userId) {
                    delete showData.occupiedSeats[seat];
                }
            });
            showData.markModified("occupiedSeats");
            await showData.save();
        }

        await Booking.findByIdAndDelete(booking._id);

        return res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};