import { Inngest } from "inngest";
import User from "../model/user.js";

// Create a client to send and receive events
export const inngest=new Inngest({id:"movie-ticket-booking"});

//inngest function to save user data to the database
const syncUserCreation=inngest.createFunction(
    {id:"sync_user_from-clerk"},
    {event:"clerk/user.created"},
    async({event})=>{
        const{id, first_name, last_name, email_address, image_url}=event.data
        const userData={
                _id:id,
                email:email_address,
                name: first_name +''+ last_name,
                image:image_url
        }
       await User.create(userData) 
       }
)

// delete sync user from the database
const syncUserDeletion=inngest.createFunction(
    {id:"delete_user_from-clerk"},
    {event:"clerk/user.delete"},
    async({event})=>{
       const {id}=event.data
    
      await User.findByIdAndDelete(id)
     
       }
)


//update sync user to the database
const syncUserUpdation=inngest.createFunction(
    {id:" update-user-fro-clerk"},
    {event:"clerk/user.updated"},
    async({event})=>{
        const{id, first_name, last_name, email_address, image_url} = event.data
        const userData={
            _id:id,
            email:email_address,
            name: first_name +' '+ last_name,
            image:image_url
    }
        await User.findByIdAndUpdate(id,userData )
    }
)



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];