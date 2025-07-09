import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets/assets';
import LoadingComponent from '../../components/LoadingComponent';

import dateFormat from '../../lib/dateFormat';
import Title from '../../components/admin/Title';

const ListBookings = () => {
 const currency=import.meta.env.VITE_CURRENCY;
  const [Bookings , setBookings] = useState([]);
  const [isLoading , setisLoading]=useState(true);

  const getBookings=async()=>{
    try{
      setBookings(dummyBookingData);
      setisLoading(false);

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getBookings();
  },[]);

  return !isLoading ? (
    <>
    <Title text1={"List"} text2={"Bookings"}/>
    <div className=' max-w-4xl mt-6 overflow-x-visible'>
     <table className='w-full border-collapse overflow-hidden text-nowrap rounded-md'>
      <thead>
        <tr className='bg-primary/20 text-left text-white overflow-x-scrolls'>
          <th className='p-2 font-medium pl-5'>User Name</th>
          <th className='p-2 font-medium '>Movie Name</th>
          <th className='p-2 font-medium '>Show Time</th>
          <th className='p-2 font-medium '>Seats</th>
          <th className='p-2 font-medium '>Amount</th>


        </tr>

      </thead>
      <tbody className='text-sm font-light'>
       {Bookings.map((booking , index)=>(
         <tr key={index} className='text-sm w-full border-b border-primary/10 bg-primary/5 even:bg-primary/10 rounded-md'>
          <td className='pl-3' >{booking.user.name}</td>
          <td className='pl-3' >{booking.show.movie.title}</td>
          <td className='pl-3' >{dateFormat(booking.show.showDateTime)}</td>
          <td className='pl-3' >{Object.keys(booking.bookedSeats).map(seats=>booking.bookedSeats[seats]).join(", ")}</td>
          <td className='pl-3' >{currency} {booking.amount}</td>

         </tr>
       ))}
       
      </tbody>

     </table>

    </div>
    </>
  ) :
   <LoadingComponent/>;
}

export default ListBookings;