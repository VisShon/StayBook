import React from 'react'
import Ameneties from '../components/home/sections/Ameneties'
import BookingCarousel from '../components/home/sections/BookingCarousel'
import HotelCarousel from '../components/home/sections/HotelCarousel'
import Plans from '../components/home/sections/Plans'
import ToursandTravels from '../components/home/sections/ToursandTravels'

import '../styles/home/App.scss'
function Home() {
  return (
    <div className="body" >
      <BookingCarousel/>
      <HotelCarousel/>
      <Ameneties/>
      <ToursandTravels/>
      <Plans/>
    </div>
  )
}

export default Home