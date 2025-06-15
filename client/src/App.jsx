import React from'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import {Toaster} from 'react-hot-toast'





const App = ()=>{
  const isAdminRoute=useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster/>
    {!isAdminRoute && <Navbar/>}


<Routes>
  <Route path = '/' element={<Home/>} />
  <Route path = '/Movies' element={<Movies/>}  />
  <Route path = '/Movies:id' element = {<MoviesDetails/>} />
<Route   path = '/Movies:id:date' element= {<SeatLayout/>} />
<Route   path = '/My-Bookings' element = {<MyBookings/>} />
<Route   path = '/Favorite' element = {<Favorite/>} />


</Routes>

{!isAdminRoute && <footer/>}
    </>
  )
}
export default App