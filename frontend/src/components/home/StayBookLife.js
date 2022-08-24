import React from 'react'
import '../../styles/home/StayBookLife.css';
import destinationImage from '../../images/Destinations.jpg';
function StayBookLife() {
  return (
   

<div className ="header"><div className = "title">Experience the Staybook life</div>
<div className = "container">
<img src = {destinationImage} className = "destinationImage"></img>
<div className = "wrapper">
<div className = "text">We will help you experience life in staybook true sense. From living among the residents to eating authentic delicacies you are sure to walk home with memories and wonderful moments.</div>
<button class="glow-on-hover" type="button">Know More</button>
</div>

    </div>
    </div>
  )
}

export default StayBookLife;