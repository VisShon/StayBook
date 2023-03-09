import React, { useEffect, useRef } from 'react'
import Ameneties from '../components/home/sections/Ameneties'
import BookingCarousel from '../components/home/sections/BookingCarousel.jsx'
import HotelCarousel from '../components/home/sections/HotelCarousel'
import ToursandTravels from '../components/home/sections/ToursandTravels'
import SpcialOffers from '../components/home/sections/SpcialOffers'
import Plans from '../components/home/sections/Plans'
import ContactUs from '../components/home/sections/ContactUs'
import '../styles/home/App.scss'
import { Helmet } from "react-helmet";
function Home() {
    const ring = useRef<HTMLDivElement>(null)
    const body = useRef<HTMLDivElement>(null)

    useEffect(() => {
        sessionStorage.removeItem('guests')

        body.current?.addEventListener('mousemove', (e) => {
            ring.current!.style.left = e.clientX + 'px'
            ring.current!.style.top = e.clientY + 'px'
        })
        body.current?.addEventListener('mouseleave',(e) => {
            ring.current!.style.opacity='0'; 
        })
        body.current?.addEventListener('mouseenter',(e) => {
            ring.current!.style.opacity = '1' 
        })
    }, [])

    return (
      <>
        <Helmet>
          <title>{`Hotel booking | Book Budget, luxury and Heritage hotels in New Delhi`}</title>
          <meta
            name="description"
            content="We provide hotel booking in New Delhi. Best Price Promise, From Luxury heritage to budget hotels near New Delhi Railway Station, Paharganj, Cannaught place."
          />
        </Helmet>
        <div className="ring" ref={ring}></div>
        <div className="body" ref={body}>
          <BookingCarousel />
          <HotelCarousel />
          <h1 style={{ opacity: "0" }}>StayBook Hotels</h1>
          <ToursandTravels />
          <Ameneties />
          <SpcialOffers />
          <Plans />
          <ContactUs />
        </div>
      </>
    );
}

export default Home
