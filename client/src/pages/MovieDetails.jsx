
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData , dummyCastsData} from '../assets/assets/assets';
import BlurCircle from '../components/BlurCircle';
import {Heart,PlayIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeformat';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard';
import LoadingComponent from '../components/LoadingComponent';



const MovieDetails = ()=>{
  const navigate=useNavigate();

    const {id} = useParams();
    const [show,setShow]=useState(null)

const getShow= async()=>{
  const show=dummyShowsData.find(show=>show._id===id)
 if(show){
  setShow({
    movie:show,
    dateTime: dummyDateTimeData,  
})
 }
}

useEffect(()=>{
    getShow();
},[id]);

    return show ? (
      <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      
      <div className='flex flex-col md:flex-row gap-8 max-w-6x1 mx-auto'>
      <img src={show.movie.poster_path} alt = '' className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />

      <div className='relative flex flex-col gap-3'>
      <BlurCircle top='100px' left='100px'/>
      <p className='text-primary'>English</p>
      <h1 className='text-4xl max-w-96 font-semibold text-balance'>{show.movie.title}</h1>
        <div className='flex gap-2 items-center text-gray-300'>
        <StarIcon className=' w-5 h-5 text-primary fill-primary gap-6 '> </StarIcon>
         {show.movie.vote_average.toFixed(1)} User Rating

         
       
        </div>
        <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
        <p>{timeFormat(show.movie.runtime)} . {show.movie.genres.map(genres=>genres.name).join(",")} . {show.movie.release_date.split("-")[0]}</p>

        <div className='flex flex-wrap items-center gap-4'>
       <button className='flex gap-2 bg-gray-800 hover:bg-gray-900 transition rounded-md px-7 py-3 text-sm cursor-pointer active:scale-95'>
        <PlayIcon className='w-5 h-5'/>
        Watch Trailer</button>
        <a href='#dateSelect' className='bg-primary rounded-md px-7 py-3 text-sm cursor-pointer active:scale-95 hover:bg-primary-dull'>Buy Tickets</a>
        <button className='bg-gray-700 rounded-full p-2.5 active:scale-95 cursor-pointer transition'>
          <Heart className={`w-h h-5`}/>
        </button>
       </div>
      
     
     

      </div>
     
      </div>
    
        <p className='text-lg mt-20 font-medium'>Your Favorite Cast</p>
  
        <div className='overflow-x-auto gap-4 no-scrollbar mt-8 pb-4'>
          <div className='flex items-center gap-4 no-scrollbar w-max px-4 '>
          {show.movie.casts.slice(0,12).map((cast,index)=>(
        <div key={index} className='flex flex-col items-center text-center'>
          <img className='rounded-full md:h-20 aspect-square h-20 object-cover' src={cast.profile_path} key={cast._id} alt="" />
        <p className='font-medium text-xs mt-3'>{cast.name}</p>
        </div>))}
          </div>  
        </div>

  
         <DateSelect datetime={show.dateTime} id={id}/>

         <p className='text-sm mt-56'>You May Also Like</p>
         <div className='flex flex-nowrap max-sm:justify-center gap-2'>
          {dummyShowsData.slice(0,4).map((movie,index)=>(<MovieCard movie={movie} key={index} />))}

         </div>
      

         <div className='flex justify-center mt-20'>
          <button onClick={()=>{navigate('/movies'); scrollTo(0,0)}} className='bg-primary hover:bg-primary-dull px-10 py-3 rounded-md font-medium cursor-pointer'>
          Show More
          </button>
         </div>
 
      
      </div>


    ):    <LoadingComponent/>

   
}
export default MovieDetails;