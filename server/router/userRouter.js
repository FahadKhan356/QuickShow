import express  from 'express';
import { getFavoites, getUserBookings, updateFavoite } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.get('/bookings',getFavoites)
userRouter.get('favorites',getUserBookings)
userRouter.get('/update-favorites',updateFavoite)

export default userRouter;