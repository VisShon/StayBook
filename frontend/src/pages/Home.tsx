import React from 'react'
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
      <ToursandTravels/>
      <Plans/>
    </div>
  )
}

export default Home