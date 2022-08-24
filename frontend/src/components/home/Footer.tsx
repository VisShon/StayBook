import React from 'react'
import JyotiMahalImage from '../../images/park.jpg';
import '../../styles/home/Footer.scss';
export default function Footer(){
  return (
    <div className = "MainDiv">
      <img src = {JyotiMahalImage} className = "FooterHotelImage"/>
      <div className = "centered">
        Plan an Unforgettable Experience in Staybook!
        <span>We can help you fit your stay and experience within your allotted budget.</span>
        <p>CALL FOR SUPPORT</p>
        <a>+91- 8373929299</a>
      </div>
    </div>
  )
}