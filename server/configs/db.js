import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
    // Reuse an existing connection (serverless cold-start friendly)
    if (cachedConnection) return cachedConnection;

    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI is not set in environment variables");
        }

        // Build database URL: "mongodb+srv://user:pass@host/<db>"
        const baseUri = uri.replace(/\/$/, "");

        cachedConnection = await mongoose.connect(`${baseUri}/QuickShow`, {
            serverSelectionTimeoutMS: 4000,
            connectTimeoutMS: 4000,
            socketTimeoutMS: 20000,
            // Fail fast if there is no live connection instead of buffering for 10s
            bufferCommands: false,
        });

        console.log("MongoDB connected");
        return cachedConnection;
    } catch (error) {
        cachedConnection = null;
        console.error("MongoDB connection error:", error.message);
        // Do NOT block the server - return null and let DB routes surface the error.
        return null;
    }
};

export default connectDB;