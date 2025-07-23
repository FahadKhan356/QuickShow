import mongoose from "mongoose";

const connectDB=async()=>{
    
    try{
        // mongoose.connection.once("open", ()=>console.log("DataBase Connected Successfully"));
    await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error", err));
    }catch(error){
        console.log(error.message);
    }
}
export default connectDB;