import React from 'react'
import { assets } from '../assets/assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-10 md:px-16 lg:px-36
     bg-cover bg-center h-screen'
      style={{ backgroundImage: `url(${assets.odyssey})` }}>

      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Odyssey</h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Drama</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5' />2026
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4.5 h-4.5' />2h 30m
        </div>
      </div>

      <p className='max-w-md text-gray-300'>A mythic retelling of Homer's epic voyage home. King Odysseus battles the Cyclops, the sorceress Circe, and the wrath of the sea itself on his perilous quest to return to Ithaca and the family he left behind.</p>

      <button onClick={() => navigate('/Movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Explore more
        <ArrowRight className='w-5 h-5' />
      </button>
    </div>
  )
}

export default HeroSection