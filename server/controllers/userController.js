

//Api Controller Function to Get User Bookings

import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking";
import Movie from "../models/Movie";

export const getUserBookings =  async (req,res)=>{
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path:"show",
            populate:{path:"movie"}
        }).sort({})
    } catch (error) {
         console.error(error);
        res.json({success:false,error:error.message})
    }
}

//Api Controller Function to Update Favorite Movie in CLerk User Metadata
export const updateFavorite = async (req,res)=>{
    try {
        const  {movieId}  = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites = []
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId);
        }else{
            user.privateMetadata.favorites =  user.privateMetadata.favorites.filter(item=>item!==movieId)
        }

        await clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata});

        res.json({success:true,message:"Favorite movies updated."});
    } catch (error) {
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}

export const getFavorites = async (req,res)=>{
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);
        const favorites = user.privateMetadata.favorites;

        //Getting movies from database
        const movies = await Movie.find({_id:{$in:favorites}});

        res.json({success:true,movies});
    } catch (error) {
         console.error(error);
        res.json({success:false,error:error.message})
    }
}

