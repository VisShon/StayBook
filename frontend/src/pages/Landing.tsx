import React from 'react'
import Navbar from'../components/home/Navbar';
import AllHotels from'../components/home/AllHotels';
import TopDestinations from'../components/home/TopDestinations';
import StayBookLife from'../components/home/StayBookLife';
import AmenetiesAndFacalities from'../components/home/AmenetiesAndFacalities';
import image from "../images/hotelimage.jpg";
import '../styles/home/MainPage.scss';

function Landing() {
  return (
    <>
      <Navbar />
      <div className="body">
        <img src={image} alt="Logo" className = "HotelImage"/>
        <div className ="centered">Budget Hotels at Every Corner of India</div>
        <div className = "normalText" >Best Hotels in Delhi -</div>
        <AllHotels />
        
        {/* <TopDestinations />
        
        <StayBookLife/>
        
        <AmenetiesAndFacalities /> */}
      </div>
    </>
  )
}

export default Landing