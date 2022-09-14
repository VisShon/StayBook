import React from 'react'
import NavBar from '../components/home/Navbar'
import BookingCarousel from '../components/home/sections/BookingCarousel'
import HotelCarousel from '../components/home/sections/HotelCarousel'
import '../styles/home/App.scss'
function Home() {
  return (
    <>
        <NavBar/>
        <div className="body" >
          <BookingCarousel/>
          <HotelCarousel/>
        </div>
    </>
  )
}

export default Home