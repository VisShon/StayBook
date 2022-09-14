import React, { useState } from "react";
import '../../styles/NavBar.scss';
function Dropdown(){

return(
    <ul>
      <li>
        <span aria-haspopup="true">Hotels</span>
        <ul className="dropdown" aria-label="submenu">
          <li  className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/HotelAiraXing'>Hotel Aira Xing</a></li>
          <li className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/HotelJyotiMahal'>Hotel Jyoti Mahal</a></li>
          <li className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/HotelPinkyVilla'>Hotel Pinky Villa</a></li>
          <li className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/HotelJaiBalaji'>Hotel Jai Balaji</a></li>
          {/* <li  className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/StayBookSD'>Staybook South Delhi</a></li>
          <li className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/ShivDevInternational'>Shiv Dev International</a></li>
          <li className = "hotels"><a style={{textDecoration:'none',color:'black'}} href='/StayBookWoodsView'>Staybook Woods View </a></li> */}
        </ul>
      </li> 
    </ul>
  )

}


export default Dropdown;