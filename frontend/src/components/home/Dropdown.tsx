import React, { useState } from "react";
import '../../styles/NavBar.scss';
import data from '../../data/hotelData.json';
function Dropdown(){

return(
    <ul>
      <li>
        <span aria-haspopup="true">Hotels</span>
        <ul className="dropdown" aria-label="submenu">
          {Object.values(data).map((item:any,i:any)=>
          (<li  className = "hotels" key={i}>
                <a style={{textDecoration:'none',color:'black'}} 
                   href={item.link}>{item.name}</a>
            </li>))}
        </ul>
      </li> 
    </ul>
  )

}


export default Dropdown;