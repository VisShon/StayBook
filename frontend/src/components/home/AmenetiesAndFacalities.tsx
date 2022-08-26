import React from 'react'
import '../../styles/home/AmenetiesAndFacalities.scss';
import AriaXingImage from "../../images/AiraXing/img1.jpg";
import JaiBalajiImage from "../../images/JaiBalaji/img1.jpg";
import JyotiMahalImage from "../../images/JyotiMahal/img1.jpg";


function AmenetiesAndFacalities() {
  return (
    <>
      <h1 className = "normalText">Amenities & Facilities</h1>
      <div className = "container">
        <p className = "textParagraph">If you are looking for a relaxing, refreshing and rejuvenating experience 
        altogether, we offer all of that under one roof.</p>
        <div className = "glow-on-hover">View All</div>
      </div>
      
      <div className = "allCards">

            <div className = "amenetiesHotel">
              <img className = "hotelImage" src = {AriaXingImage}/>
              <div className = "column">
                <h2 className = "hotelName">24 hour Help Desk</h2>
                <p className = "textRow">We provide you 24 hour help and guide you in a proper manner.</p>
                <div className="glow-on-hover">Read More</div>
              </div>
            </div>
            
            <div className = "amenetiesHotel">
              <img className = "hotelImage" src = {JaiBalajiImage}/>
              <div className = "column">
                <h2 className = "hotelName">Room Service</h2>
                <p className = "textRow">We have in house kitchen, whatever you would like to eat we will provide in your room within 15 min.</p>
                <div className="glow-on-hover">Read More</div>
              </div>
            </div>

            <div className = "amenetiesHotel">
              <img className = "hotelImage" src = {JyotiMahalImage}/>
              <div className = "column">
                <h2 className = "hotelName">In-house Restaurants</h2>
                <p className = "textRow">We have three in-house restaurants offering different cuisines that you can choose from.</p>
                <div className="glow-on-hover">Read More</div>
              </div>
            </div>

        </div>
    </>
  );
}

export default AmenetiesAndFacalities;