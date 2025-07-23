import express from 'express';
import { protectedAdmin } from '../middleware/auth.js';
import { getAllBookings, getAllShows, getDashboardData } from '../controller/adminController.js';

const adminRouter=express.Router();

adminRouter.get('is-admin',protectedAdmin),
adminRouter.get('/dashboard',protectedAdmin,getDashboardData),
adminRouter.get('all-shows',protectedAdmin,getAllShows),
adminRouter.get('all-bookings',protectedAdmin,getAllBookings)

export default adminRouter;