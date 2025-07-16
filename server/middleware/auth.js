import { clerkClient } from "@clerk/express";

export const protectedAdmin = async(req, res, next)=>{

    try{
         const {userid} = req.auth();
            const user = await clerkClient.users.getUser(userid);

            if(user.privateMetadata.role !== 'admin'){
                res.json({success:false , message: 'not authorized'})
            }
          next();

    }catch(error){
        res.json({success:false , message: 'not authorized'})
    }
}