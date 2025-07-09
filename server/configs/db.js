import mongoose from "mongoose";

const connectDB=async()=>{
    
    try{
        mongoose.connection.once("open", ()=>console.log("DataBase Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`)
    }catch(error){
        console.log(error.message);
    }
}
export default connectDB;