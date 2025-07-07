
import React, { useEffect } from 'react'
import { assets, dummyBookingData } from '../assets/assets/assets';
import { useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import BlurCircle from '../components/BlurCircle';
import timeFormat from '../lib/timeformat';
import dateFormat from '../lib/dateFormat';

const MyBookings = ()=>{

    const currency=import.meta.env.VITE_CURRENCY
    const [bookings,setBookings]=useState([]);
    const [isLoading,setLoader]=useState(true);

    const getBookings=async()=>{
        setBookings(dummyBookingData)
        setLoader(false)
    }

     useEffect(()=>{getBookings()},[])
    
     return !isLoading ? 
     (<div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
     <BlurCircle top='100px' left='100px' />
     <div>
     <BlurCircle bottom='0px' left='600px' />
     </div>
     <h1 className='font-semibold mb-4 text-lg'>My Bookings</h1>

     {bookings.map((bookings,index)=>(
        <div key={index} className='flex flex-col md:flex-row bg-primary/8 border border-primary/20 rounded-lg p-2 mt-4 justify-between max-w-3xl'>
       <div className='flex flex-col md:flex-row'>
       <img className='max-w-45 aspect-video h-auto object-cover object-bottom rounded' src={bookings.show.movie.poster_path} alt=''></img>
        <div className='flex flex-col p-4'>
        <p className='text-lg font-semibold'>{bookings.show.movie.title}</p>
        <p className='text-gray-400 text-sm'>{timeFormat(bookings.show.movie.runtime)}</p>
        <p className='text-gray-400 text-sm'>{dateFormat(bookings.show.showDateTime)}</p>
        </div>
       </div>
       <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
        <div className='flex items-center gap-4'>
            <p className='test-2xl font-semibold mb-3'>{currency}{bookings.amount}</p>
            {!bookings.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Play Now</button>}
        </div>
        <div className='text-sm'>
            <p><span className='text-gray-400'>Total Tickets:</span>{bookings.bookedSeats.length}</p>
            <p><span className='text-gray-400'>Booked Seats:</span>{bookings.bookedSeats.join(", ")}</p>
        </div>

       </div>


      
        </div>
     ))}
     </div>)
      : <LoadingComponent/>
}
export default MyBookings;