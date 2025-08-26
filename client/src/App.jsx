import React from 'react'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import MyBookings from './pages/MyBookings'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import {Toaster } from "react-hot-toast";


const App = () => {
  const {user} = useAppContext();
  const isadminPanel = useLocation().pathname.startsWith('/admin');
 

  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route  path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>} />
        <Route path="/movies/:id/:date" element={<SeatLayout/>} />
        <Route path="/my-bookings" element={<MyBookings/>}/>
         <Route exact path="/loading/:nextUrl" element={<Loading/>} />
        <Route path="/favorite" element={<Favorite/>} />
      <Route exact path="/admin/" element={user ? <Layout/>:(
         <div className='min-h-screen flex items-center justify-center'>
          <SignIn fallbackRedirectUrl={'/admin'}/>
        </div>
      )}> 
         <Route index element={<Dashboard/>}/>
          <Route exact path="add-shows" element={<Addshow/>}/>
          <Route exact path="list-shows" element={<Listshow/>}/>
          <Route exact path="list-bookings" element={<Listbookings/>}/>

      </Route>


      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App