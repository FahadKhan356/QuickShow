//Api Function To Get All Users Boookings

import { clerkClient } from "@clerk/express";
import Booking from "../model/booking.js";
import Movie from "../model/Movie.js";

export const getUserBookings=async(req, res)=>{
    try{

        const {user}= req.auth().userId;

   const bookings =await Booking.find({user})
   .populate({path:'show', populate:{path:'movie'}}).sort({createdAt:-1})
   
   res.json({success:true, bookings})


    }catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

//Api Function To Update Favorite Movie in Clrek MetaData
export const updateFavoite=async(req, res)=>{
    try{
             const {userId} = req.auth().userId;
             const movieId= req.body;

            const user= await clerkClient.users.getUser(userId);
            if(!user.privateMetadata.favorites){
                user.privateMetadata.favorites=[];
            }

            if(!user.privateMetadata.favorites.includes(movieId)){
                user.privateMetadata.favorites.push[movieId]
            }else{
                user.privateMetadata.favorites= user.privateMetadata.favorites.filter(item=>item!==movieId);
            }
            clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata})

            res.json({success:true, message:"Favorite  added successfully. "})



    }catch(error){
        console.log(error.message)
        res.json({success:fasle, message: error.message});
    }
}

//Get Favorie Movies List
export const getFavoites=async(req, res)=>{
    try{
         const {userId}= req.auth().userId;
         const user = await clerkClient.users.getUser(userId);

         const favorites=await user.privateMetadata.favorites;


         const movies= Movie.find({_id: {$in: favorites }});
          res.json({success:true, movies})

          


    }catch(error){
        console.log(error.message)
        res.json({success:fasle, message: error.message});
    }
}