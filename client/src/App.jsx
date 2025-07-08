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
import Dashboard from './pages/admin/Dashboard';
import AddShows from './pages/admin/AddShows';
import  ListShows  from './pages/admin/ListShows';
import  ListBookings  from './pages/admin/ListBookings'
import Layout from './pages/admin/Layout';





const App = ()=>{
const isAdminRoute=useLocation().pathname.startsWith('/admin'); 
return (

  <>

  <Toaster/>
  {!isAdminRoute && <Navbar/>}

  <Routes>
  <Route path='/' element={<Home/>}  />
  <Route path='/Movies' element={<Movies/>}  />
  <Route path='/Movies/:id' element={<MovieDetails/>} />
  <Route path='/Movies/:id/:date' element={<SeatLayout/>} />
  <Route path='/MyBookings' element={<MyBookings/>} />
  <Route path='/Favorite' element={<Favorite/>} />
  <Route path='/admin/*' element={<Layout/>}>
  <Route index element ={<Dashboard/>}/>
  <Route path='add-shows' element={<AddShows/>}/>
  <Route path='List-shows' element={<ListShows/>}/>
  <Route path='List-bookings' element={<ListBookings/>}/>


  </Route>
  </Routes>

{!isAdminRoute && <Footer/>}



    </>
)


}
export default App;