import React, { useEffect, useRef } from 'react'
import Ameneties from '../components/home/sections/Ameneties'
import BookingCarousel from '../components/home/sections/BookingCarousel.jsx'
import HotelCarousel from '../components/home/sections/HotelCarousel'
import ToursandTravels from '../components/home/sections/ToursandTravels'
import SpcialOffers from '../components/home/sections/SpcialOffers'
import Plans from '../components/home/sections/Plans'
import '../styles/home/App.scss'

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
            <div className="ring" ref={ring}></div>
            <div className="body" ref={body}>
                <BookingCarousel />
                <HotelCarousel />
                <h1 style={{opacity:'0'}}>StayBook Hotels</h1>
                <ToursandTravels />
                <Ameneties />
                <SpcialOffers/>
                <Plans />
            </div>
        </>
    )
}

export default Home
