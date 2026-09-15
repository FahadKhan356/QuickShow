import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import mongoose from 'mongoose';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import showRouter from './router/showRouter.js';
import bookingRouter from './router/bookingRouter.js';
import adminRouter from './router/adminRouter.js';
import userRouter from './router/userRouter.js';


const app = express();
const port = process.env.PORT || 3000;


// Middleware (base)
app.use(express.json())
app.use(cors())

// Routes that do NOT require DB or auth (respond instantly - useful for diagnostics)
app.get('/', (req, res) => res.send('server is live'));
app.get('/api/health', (req, res) => {
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    success: true,
    dbUriSet: !!process.env.MONGODB_URI,
    dbState: stateMap[mongoose.connection.readyState] || 'unknown',
    time: new Date().toISOString(),
  });
});

// Auth middleware (needed for protected routes)
app.use(clerkMiddleware())

// Ensure MongoDB is connected before handling DB routes (lazy, fail-fast)
app.use(async (req, res, next) => {
  await connectDB();
  next();
})


// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter)
app.use("/api/booking", bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

// Vercel: export the Express app directly (no serverless-http wrapper)
export default app;

// Local development server (skipped when running on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`server listening at http://localhost:${port}`));
}
