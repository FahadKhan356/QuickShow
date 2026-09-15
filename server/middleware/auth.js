import { clerkClient, getAuth } from "@clerk/express";

// Middleware to protect any route requiring a signed-in user
export const protectedRoute = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        req.userId = userId;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }
};

// Middleware to protect admin-only routes
export const protectedAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await clerkClient.users.getUser(userId);

        if (!user.privateMetadata.role || user.privateMetadata.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Not authorized - admin only" });
        }

        req.userId = userId;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ success: false, message: "Not authorized - admin only" });
    }
};