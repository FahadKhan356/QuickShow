import Booking from "../model/booking.js";
import Show from "../model/Show.js"

//function to check availability of selected seats for a movie
const CheckSeatsAvailability = async (showId,selectedSeats)=> {

    try{
   const showData=await Show.findById(showId);

   if(!showData) return false;

   const occupiedSeats=showData.occupiedSeats;
   const isAnySeatTaken = selectedSeats.some(seat=>occupiedSeats[seat]);
    
   return !isAnySeatTaken;

    }catch(error){
        console.log(error.message);
    return false;
    }
}

export const createBooking=async(req,res)=>{
    try{
        const {userId}=req.auth();
        const {showId, selectedSeats}=req.body;
        const {origin}= req.headers;

        //Check If Seats Are Availble
        const isAvailble=await CheckSeatsAvailability(showId,selectedSeats);

        if(!isAvailble) return res.json({success:false, message: "Selected Seats are not available"});

        const showData= await  Show.findById(showId).populate("movie");

        const booking= await Booking.create({
            user:userId,
            show:showId,
            amount:showData.showPrice * selectedSeats.length,
            bookingSeats:selectedSeats,
        })
        
        selectedSeats.map((seat)=>{ showData.occupiedSeats[seat]=userId }),
        showData.markModified('occupiedSeats'),

        await showData.save();

        //Stripe Gateway Initialize 

        return res.json({success:true, message:"Booked successfully"})
       
      

    }catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message})
    }
}

 // Get Occupied Seats
 export const getOccupiedSeats=async(req,res)=>{
    try{
          const {showId}=req.params;

          const showData=await Show.findById(showId);
          if(!showData) return false;

          const occupiedSeats=Object.keys(showData.occupiedSeats);

          return res.json({success:true, occupiedSeats})


    }catch(error){
        console.log(error);
        return res.json({success:false, message:error.message});
    }
 }