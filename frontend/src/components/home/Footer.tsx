import React from 'react'
import '../../styles/Footer.scss';
import footerBg from '../../images/footerBg.svg'
import logo from '../../images/logo.png'

export default function Footer(){
  return (
    <div className="footerBody">
      <img src={footerBg}/>

      <div className="logoCircle">
        <img src={logo}/>
        <div className="line"></div>
        <a href='Tel: +91-8373929299'>Ph. no: +91-8373929299</a>
        <a href='mailto: booking@staybook.in'>booking@staybook.in</a>
      </div>

      <div className="linkCard">
        <div className="heading">
          <h2>Hotels:</h2>
          <a href='/HotelAiraXing'>Hotel Aira Xing</a>
          <a href='/HotelJyotiMahal'>Hotel Jyoti Mahal</a>
          <a href='/HotelPinkyVilla'>Hotel Pinky Villa</a>
          <a href='/HotelJaiBalaji'>Hotel Jai Balaji</a>
        </div>

        <div className="heading">
          <h2>Socials:</h2>
          <a href='/'>Instagram</a>
          <a href='/'>Trip Advisor</a>
          <a href='/'>Facebook</a>
          <a href='/'>Twitter</a>
        </div>

        <div className="heading">
          <h2>Blogs:</h2>
          <a href='/packages'>Travel Packages</a>
          <a href='/contactUs'>Other Facilities</a>
        </div>

        <div className="heading">
          <h2>Misc:</h2>
          <a href='/contactUs'>Contact Us</a>
          <a href='/packages'>Tours and Packages</a>
          <a href='/blogs'>Blogs</a>
          <a href='/contactUs'>Feedback</a>
        </div>
      </div>
    </div>
  )
}