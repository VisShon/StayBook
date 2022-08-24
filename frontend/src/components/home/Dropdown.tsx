import React, { useState } from "react";
import '../../styles/home/Dropdown.scss';
function Dropdown(){

return(
    <ul>
      <li>
        <span aria-haspopup="true">All Hotels</span>
        <ul className="dropdown" aria-label="submenu">
          <li className = "hotels">Hotel Aira Xing</li>
          <li className = "hotels">Hotel Jyoti Mahal</li>
          <li className = "hotels">Hotel Pinky Villa</li>
          <li className = "hotels">Hotel Jai Balaji</li>
          <li  className = "hotels">Staybook South Delhi</li>
          <li className = "hotels">Shiv Dev International</li>
          <li className = "hotels">Staybook Woods View </li>
        </ul>
      </li> 
    </ul>
  )

}


export default Dropdown;