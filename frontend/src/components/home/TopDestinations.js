import React from 'react'
import '../../styles/home/TopDestinations.css';
import destinationImage from '../../images/Destinations.jpg';
function TopDestinations() {
  return (
   

<div className ="header"><div className = "title">Top Destinations</div>
<div className = "container">
<img src = {destinationImage} className = "destinationImage"></img>
<div className = "wrapper">
<div className = "text">Surrounded by scenic beauty and attractive tourist attractions we make it convenient for you to visit all the beautiful places with our inhouse guide. We can also help you arrange transport facilities for an easier commute to nearby places.</div>
<button class="glow-on-hover" type="button">Know More</button>
</div>

    </div>
    </div>
  )
}

export default TopDestinations;