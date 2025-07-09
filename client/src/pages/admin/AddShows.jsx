import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets/assets';
import LoadingComponent from '../../components/LoadingComponent';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { Kconverter } from '../../lib/Kconverter';


const AddShows = () => {
const currency=import.meta.env.VITE_CURRENCY;

const [nowPlayingMovies , setNowPlayingMovies]=useState([]);
const [selectedMovies , setSelectedMovies]=useState(null);
const [dateTimeSelection , setDateTimeSelection]=useState({});
const [dateTimeInput , setDateTimeInput]=useState("");
const [showPrice , setshowPrice]=useState("");

const fetchNowPlayingMovies=async()=>{
  setNowPlayingMovies(dummyShowsData)
}


useEffect(()=>{
  fetchNowPlayingMovies();
},[]);

const handleDateTimeAdd=()=>{
  if(!dateTimeInput) return;
  const [date, time] = dateTimeInput.split("T");
  if(!date || !time) return;

  setDateTimeSelection((prev)=>{
    const times = prev[date] || [];
    if(!times.includes(time)){
      return {...prev, [date]:[...times, time]};
    }
 return prev;
  })
}

const handleRemoveDateTime=(date, time)=>{
  setDateTimeSelection((prev)=>{
    const filteredTimes= prev[date].filter((t)=>t!==time);
    if(filteredTimes.length===0){
      const { [date]:_,...rest }=prev;
      return rest;
    }
    return {
      ...prev,
      [date]:filteredTimes,
    };
  });

};

  return nowPlayingMovies.length > 0 ?
    (
 
   <>
  <Title text1={"Add"} text2={"Movies"}/>
  <div className='overflow-x-auto pb-4 '>
    <div className='flex flex-wrap gap-4 w-max group' >
    {nowPlayingMovies.map((movie)=>(
  <div onClick={()=>setSelectedMovies(movie.id)} className='group-flex flex-wrap gap-4 mt-4 w-max overflow-x-visible'>
       <div key={movie.id} className='overflow-hidden relative max-w-40 rounded-md h-full
       group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
      <img className='rounded-md object-cover brightness-90' src={movie.poster_path}/>

      <div className='flex items-center justify-between absolute bottom-0 left-o text-sm w-full px-1 bg-black/70'>
        
        <p className='flex items-center gap-1'>
        <StarIcon className=' w-4 h-4 fill-primary text-primary'/>
          {movie.vote_average.toFixed(1)}
        
        </p>

        <p>{Kconverter(movie.vote_count)}  votes</p>

      </div>
      
     {selectedMovies===movie.id && ( 
     <div className='top-2 right-2 absolute flex items-center bg-primary h-6 w-6 rounded justify-center'>
      <CheckIcon className='w-4 h-6 text-white' strokeWidth={2.5}  />

     </div>)} 

     </div>

  </div>
  ))}
    </div>
  </div>

{/* Show Price Input*/}
  <div className='mt-7'>
    <label className='block text-sm font-medium mb-2' >Show Price</label>
    <div className='inline-flex  items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
      <p className='text-gray-400 text-sm'>{currency}</p>
      <input min={0} type="number" value={showPrice} onChange={(e)=>setshowPrice(e.target.value)} placeholder='Enter show' className='outline-none' >
      </input>

    </div>

  </div>

  {/* date time */}
  <div className='mt-7'>
  <label className='block text-sm font-medium mb-2'>Select Date and Time</label>
  <div className='inline-flex border border-gray-600 rounded-lg gap-5 p-1 pl-3'>
  <input  type='datetime-local' value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} className='outline-non rounded-md' />
  <button onClick={handleDateTimeAdd}  className='bg-primary/80 hover:bg-primary text-white rounded-lg cursor-pointer px-3 py-2 text-sm'>
  Add Time
  </button>

  </div>
  </div>

 {Object.keys(dateTimeSelection).length > 0 && 
 <div className='mt-5'>
  <h2 className='mb-2'>Selected Date-Time</h2>
  <ul className='space-y-3'>
    {Object.entries(dateTimeSelection).map(([date, time])=>(
      <li key={date}>
        <div className='font-medium'>{date}</div>
        <div className='flex flex-wrap mt-1 gap-2 text-sm'>
         {time.map((time)=>(
          <div className='border border-primary px-2 py-1 flex items-center rounded'>
          <span>{time}</span>
          <DeleteIcon onClick={()=>handleRemoveDateTime(date,time)} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer' />
          </div>
         ))}

        </div>

      </li>
    ))}

  </ul>
  <button  className='bg-primary px-8 py-2 mt-6 text-white rounded hover:bg-primary/90 cursor-pointer' >
  Add Show
  </button>  


</div>}

   </>
  
    )
   : <LoadingComponent/>
}

export default AddShows