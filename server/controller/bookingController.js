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