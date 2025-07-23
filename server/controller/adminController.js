
import Booking from "../model/booking.js";
import Show from "../model/Show.js";


export const isAdmin=async(req , res)=>{
    try{
     res.json({succcs:true, isAdmin:true});
    }catch(error){

    }
}

//Get Dashboard Data
export const getDashboardData=async(req, res)=>{
    try{  
        const totalUser = await User.countDocuments();
        const activeShows= await Show.find({showDateTime:{$gte:new Date()}}).populate('movie');
        const bookings= await Booking.find({isPaid:true});

        const dashboardData={
            totalBookings:bookings.length,
            totalUser:totalUser,
            activeShows:activeShows,
            totalRevenue:bookings.reduce((acc, booking)=> acc+booking.amount,0 ),
        }
         res.json({success:true, dashboardData})

    }catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
} 

// Get All Shows
 export const getAllShows=async(req, res)=>{

    try{
        const shows= await Show.find({showDateTime:{$gte:new Date().populate('movie').sort({showDateTime: 1})}})
        res.json({succes:true, shows});

    }catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
 } 

//Get All Bookings
export const getAllBookings=async(req, res)=>{
try{
const bookings=await Booking.find({}).populate('user').
populate({ path:"show",populate:{path:"movie"}}).sort({createdAt:-1})

res.json({success:true, bookings})
        

}catch(error){
    console.log(error.message);
    return res.json({success:false, message:error.message});
}
}