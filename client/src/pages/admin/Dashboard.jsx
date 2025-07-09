import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets/assets';
import LoadingComponent from '../../components/LoadingComponent';

import {ChartLineIcon ,CircleDollarSignIcon,PlayCircleIcon,StarIcon,UsersIcon} from 'lucide-react';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import dateFormat from '../../lib/dateFormat';

const Dashboard = () => {

  const currency=import.meta.env.VITE_CURRENCY;

  const [dashboardData,setDashboardData]=useState({
    totalBookings:0,
    totalRevenue:0,
    activeShows:[],
    totalUser:0,
  });

  const [loading , setLoading]=useState(true);

  const dashboardCards=[
    {title:"Total Bookings", value: dashboardData.totalBookings || "0", icon:ChartLineIcon},
    {title:"Total Revenue", value: dashboardData.totalRevenue || "0", icon:CircleDollarSignIcon},
    {title:"Active Shows", value: dashboardData.activeShows.length || "0", icon:PlayCircleIcon},
    {title:"Total Users", value: dashboardData.totalUser || "0", icon:UsersIcon},

  ]
  const fetchDashboardData=async()=>{
    setDashboardData(dummyDashboardData)
    setLoading(false)
  
  };

  useEffect(()=>{
    fetchDashboardData();
  },[]);

  return !loading? (
    <>
    <Title text1="Admin" text2="Dashboard" />
   <div className='relative flex flex-wrap gap-4 mt-6'>
    <BlurCircle top='-100px' left='0'/>
    <div className='flex flex-wrap gap-4 w-full' >
      {dashboardCards.map((card , index)=>(
        <div key={index} className=' flex items-center justify-between px-4 py-5
         bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
          <div>
            <h1 className='text-sm'>
            {card.title}
            </h1>
            <p className='text-xl font-medium mt-1'>
          {card.value}
            </p>
          </div>
           <card.icon className='w-6 h-6'/>
        </div>
      ))}
    </div>
    
   </div>
   <p className='mt-10 text-md font-bold'>Active Shows</p>
   <div className='relative flex flex-wrap gap-5 max-w-5xl'>
   <BlurCircle top='100px' left='-10%' />
   {
    dashboardData.activeShows.map((show) => (
        <div key={show._id} className='flex flex-col justify-between bg-primary/10 border p-0 border-primary/20 mt-6
         hover:translate-y-1 transition duration-300 w-55  h-full  rounded-lg overflow-hidden  '>
          <img className='object-cover h-60 w-full rounded' src={show.movie.poster_path} alt=''/>
          
         <div className='flex flex-col px-2 mt-4 '>
          <p className='text-md truncate'>{show.movie.title}</p>
          <div className='flex flex-row justify-between py-3 '>
            <div className='flex flex-row'>
              <p >{currency}</p>
              <p className='px-1'>{show.showPrice}</p>
              

            </div>
            <div className='flex flex-row items-center'>
              <StarIcon className='w-4 h-4 fill-primary text-primary'/>
              <p className='px-1 text-sm font-light'>{show.movie.vote_average.toFixed(1)}</p>
              

            </div>
            
            </div>
          <p className='text-gray-400 text-sm mb-5
          '>{dateFormat(show.showDateTime)}</p>

         </div>
        </div>

      ))
  }

   </div>

    </>
  ): <LoadingComponent/>
}

export default Dashboard