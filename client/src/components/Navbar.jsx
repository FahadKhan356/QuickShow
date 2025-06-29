import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { assets } from '../assets/assets/assets';
import {MenuIcon,SearchIcon, TicketPlus, XIcon} from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {

  const [isOpen,setisOpen]=useState(false)
  const {user}=useUser()
  const {openSignIn}=useClerk()
  const navigate=useNavigate()
    return (
      <div className="fixed top-0 left-0 z-50 w-full px-6 md:px-16 lg:px-36 py-5 flex items-center bg-black">
      {/* 👈 Left: Logo */}
      <div className="flex-1">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-36 h-auto" />
        </Link>
      </div>
    
      {/* 🔵 Center: Navigation Links */}
      <div className={`max-md:absolute max-md:top-0 max-md:left-0 
  max-md:font-medium max-md:text-lg max-md:justify-center max-md:h-screen
  z-50 flex flex-col md:flex-row items-center justify-center
  gap-8 min-md:px-8 py-3 min-md:rounded-full
  backdrop-blur bg-black/70 md:bg-white/10 md:border border-grey-300/20
  overflow-hidden transition-[width] duration-300  ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
    <XIcon className='md:hidden absolute top-6 right-6 w-10 h-6 cursor-pointer' onClick={()=>setisOpen(!isOpen)}></XIcon>
        <Link onClick={()=>{scrollTo(0,0) ; setisOpen(false)}} to="/">Home</Link>
        <Link onClick={()=>{scrollTo(0,0) ; setisOpen(false)}} to="/movies">Movies</Link>
        <Link onClick={()=>{scrollTo(0,0) ; setisOpen(false)}} to="/">Theaters</Link>
        <Link onClick={()=>{scrollTo(0,0) ; setisOpen(false)}} to="/">Releases</Link>
        <Link onClick={()=>{scrollTo(0,0) ; setisOpen(false)}} to="/favorite">Favorites</Link>
      </div>
    
      {/* 👉 Right: Icons and Button */}
      <div className="flex-1 flex justify-end items-center gap-6">
        <SearchIcon className="w-6 h-6 cursor-pointer" />
        { !user ? (
          <button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Login
        </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label='Bookings' labelIcon={<TicketPlus width={15} />} onClick={()=>navigate('/MyBookings')
              }/>
            </UserButton.MenuItems>
          </UserButton>
        ) }   
        <MenuIcon onClick={()=>setisOpen(!isOpen)} className="md:hidden w-8 h-8 cursor-pointer" />
      </div>
    </div>
    
    )
}

export default Navbar;
