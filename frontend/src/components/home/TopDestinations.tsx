import React from 'react'
import '../../styles/home/TopDestinations.scss';
import destinationImage from '../../images/Destinations.jpg';
function TopDestinations() {
  return (
    <div className ="header">
          <h2 className = "title">Top Destinations</h2>
          <div className = "destinationContainer">
              <img src = {destinationImage} className = "destinationImage"></img>
              <div className = "destinationWrapper">
                  <p className = "text">Surrounded by scenic beauty and attractive tourist attractions we make it convenient for you to visit all the beautiful places with our inhouse guide. We can also help you arrange transport facilities for an easier commute to nearby places.</p>
                  <div className="glow-on-hover">Know More</div>
              </div>
          </div>
    </div>
  )
}

export default TopDestinations;