
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets/assets';
import LoadingComponent from '../components/LoadingComponent';
import { ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';

const SeatLayout = ()=>{
    const {id,date}=useParams();
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [show, setShow] = useState(null);
 
    const navigate=useNavigate();
    const getShow= async ()=>{
      const show = dummyShowsData.find(show => show._id === id);
      if(show){
        setShow({
            movie:show,
            dateTime:dummyDateTimeData
        })
      }
    }

    useEffect(()=>{
        getShow()
    },[])

    return show? (
        <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
            {/*available times */}
            <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
            <p className='text-lg font-semibold px-6'>Available Timings</p>
             <div>
             {show.dateTime[date].map((item)=>
             <div key={item.time} onClick={()=> setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition 
             ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                <ClockIcon className='w-4 h-4'/>
                <p className='text-sm'>{isoTimeFormat(item.time)}</p>
                </div>)} 
             </div>
           
            </div>

            <div className='relative flex-1 flex flex-col items-center max-md:mt-16'></div>
            
        </div>
    ) : (<LoadingComponent/>)
}
export default SeatLayout;