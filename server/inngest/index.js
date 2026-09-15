import { Inngest } from "inngest";
import User from "../model/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Helper to extract the primary email from a Clerk User object
const getEmail = (user) => {
    if (user.email_addresses && user.email_addresses.length > 0) {
        return user.email_addresses[0].email_address;
    }
    return user.email_address || "";
};

// Inngest function to save user data to the database
const syncUserCreation = inngest.createFunction(
    { id: "sync_user_from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, image_url } = event.data;
        const userData = {
            _id: id,
            email: getEmail(event.data),
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            image: image_url,
        };
        await User.create(userData);
    }
);

// Delete synced user from the database
const syncUserDeletion = inngest.createFunction(
    { id: "delete_user_from-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
    }
);

// Update synced user in the database
const syncUserUpdation = inngest.createFunction(
    { id: "update_user_from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const { id, first_name, last_name, image_url } = event.data;
        const userData = {
            email: getEmail(event.data),
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            image: image_url,
        };
        await User.findByIdAndUpdate(id, userData);
    }
);

// Export the Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];