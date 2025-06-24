import React from'react';
import Navbar from './components/Navbar';
import {Routes,Route,useLocation} from 'react-router-dom';



import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SeatLayout from './pages/SeatLayout';
import Favorite from './pages/Favorite';
import MyBookings from './pages/MyBookings';
import MovieDetails from './pages/MovieDetails';
import {Toaster} from 'react-hot-toast';




const App = ()=>{
const isAdminRoute=useLocation().pathname.startsWith('/admin'); 
return (

  
  <>

  <Toaster/>
  {!isAdminRoute && <Navbar/>}

  <Routes>
  <Route path='/' element={<Home/>}  />
  <Route path='/Movies' element={<Movies/>}  />
  <Route path='/MoviesDetails/:id' element={<MovieDetails/>} />
  <Route path='/MoviesDetails/:id/:date' element={<SeatLayout/>} />
  <Route path='/MyBookings' element={<MyBookings/>} />
  <Route path='/Favorite' element={<Favorite/>} />
  </Routes>

{!isAdminRoute && <Footer/>}



    </>
)


}
export default App;