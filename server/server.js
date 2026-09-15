import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import serverless from 'serverless-http';
import showRouter from './router/showRouter.js';
import bookingRouter from './router/bookingRouter.js';
import adminRouter from './router/adminRouter.js';
import userRouter from './router/userRouter.js';


const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// Ensure MongoDB is connected before handling requests (lazy, fail-fast)
app.use(async (req, res, next) => {
  await connectDB();
  next();
})


// Routes
app.get('/', (req, res) => res.send('server is live'));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter)
app.use("/api/booking", bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

// Vercel serverless handler
const handler = serverless(app);
export default handler;

// Local development server (skipped when running on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log(`server listening at http://localhost:${port}`));
}
