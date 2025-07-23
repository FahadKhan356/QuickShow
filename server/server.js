import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest ,functions} from './inngest/index.js';
import showRouter from './router/showRouter.js';
import bookingRouter from './router/bookingRouter.js';
import adminRouter from './router/adminRouter.js';
import userRouter from './router/userRouter.js';
// import { inngest, functions } from "./inngest/index.js"
// import serverless from 'serverless-http'; // ✅ Important


const app=express();
const port = 3000;
await connectDB()


//Midlleware
app.use(express.json()) 
app.use(cors())
app.use(clerkMiddleware())


//first api
app.get('/',(req, res)=>res.send('server is live'));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter)
app.use("/api/booking", bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

// export default serverless(app);
app.listen(port,()=>console.log(`server listening at http://localhost:${port}`));
