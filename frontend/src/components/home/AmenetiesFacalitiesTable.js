import React from 'react'
import '../../styles/home/AmenetiesFacalitiesTable.css';
import AriaXingImage from "../../images/AiraXing/img1.png";
import JaiBalajiImage from "../../images/JaiBalaji/img1.jpg";
import JyotiMahalImage from "../../images/JyotiMahal/img1.jpg";
import PinkyVillaImage from "../../images/PinkyVilla/img1.jpg";
function AmenetiesFacalitiesTable() {
  return (
      
<div className = "MainComponent">


 <div className ="allCards">
 <div className = "hotel">
 
 <div className = "hotelName">24 hour Help Desk</div>
 <div className = "AiraXing"><img src = {AriaXingImage} className = "AiraXingImage"></img></div>
 <div className = "row">Airport pick-up/drop-off, room service, and complimentary Wi-Fi are all available at Hotel Aira Xing. The budget hotel Aira Xing is a 10-minute drive from the New Delhi Railway Station and the Jhandewalan Metro Station</div>
 <button class="glow-on-hover" type="button">Read More</button>
 </div>
 <div className = "hotel">
 <div className = "hotelName">Room Service</div>
 <div className = "JaiBalaji"><img src = {JaiBalajiImage} className = "JaiBalajiImage"></img></div>
 <div className = "row">Air - conditioned rooms include a desk, a flat-screen TV, a private bathroom, as well as bed linen and towels. Each room at Hotel Jai Balaji includes a seating space. A continental or à la carte breakfast is available at the hotel.</div>
 <button class="glow-on-hover" type="button">Read More</button>
 </div>

 <div className = "hotel">
 <div className = "hotelName">In-house Restaurants</div>
 <div className = "JyotiMahal"><img src = {JyotiMahalImage} className="JyotiMahalImage"></img></div>
 <div className = "row">The rooms have king-size beds, cable TV, and a large bathroom with hot and cold water 24 hours a day. A balcony is available in some rooms. The Hotel Jyoti Mahal is located little over half a kilometre from Connaught Place.</div>
 <button class="glow-on-hover" type="button">Read More</button>
 </div>



 </div>

</div>

  )
}

export default AmenetiesFacalitiesTable;