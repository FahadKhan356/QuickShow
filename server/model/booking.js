import mongoose from 'mongoose';

const BookingSchema=mongoose.Schema({
    user:{type:String, required:true, ref:"User"},
    show:{type:String, required:true, ref:"Show"},
    amount:{type:Number, required:true,},
    bookingSeats:{type:Array, required:true},
    isPaid:{type:Boolean,default:false},
    paymentLink:{type:String},},
    {timestamps:true});


const Booking=mongoose.model("Booking",BookingSchema);
export default Booking;