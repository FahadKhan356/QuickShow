import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData , dummyCastsData} from '../assets/assets/assets';
import BlurCircle from '../components/BlurCircle';
import { ChevronLeftIcon,ChevronRightIcon ,Heart,PlayIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeformat';
import toast from 'react-hot-toast';


const DateSelect = ({datetime,id}) => {
const navigate=useNavigate();

  const [selected,setSelect]=useState(null);
  const onBookHandler=()=>{
    if(!selected){
      return toast("Please select a date")
    }
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0,0)

  }

  return (
    <div id='dateSelect' className='pt-30'>
 
  <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
   <BlurCircle top='-100px' left='-100px'/>
   <BlurCircle top='100px' right='0px' />

 
   <div>
   <p className='text-lg font-semibold'>Choose Date</p>
  <div className='flex items-center gap-6 text-sm mt-5'>
  <ChevronLeftIcon width={28}></ChevronLeftIcon>
   <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-3'>
    {Object.keys(datetime).map((date)=>(
      <button onClick={()=>setSelect(date)} key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer
        ${selected === date? "bg-primary text-white": "border border-primary/70" } `}>
        <span>{new Date(date).getDate()}</span>
        <span>{new Date(date).toLocaleDateString("en-US", {month:"short"})}</span>

      </button>
    ))}
   </span>
  <ChevronRightIcon  width={28} ></ChevronRightIcon>
  </div>
 

   </div>

   <button onClick={onBookHandler} className='bg-primary hover:bg-primary-dull px-4 py-1 transition rounded-lg'>Book Now</button>
  



  </div>
  </div>


  )
}

export default DateSelect