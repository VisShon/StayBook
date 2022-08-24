import React from 'react'
import '../../styles/home/TopDestinations.scss';
import destinationImage from '../../images/life.jpg';
function StayBookLife() {
  return (
  
      <div className ="header">
        <h2 className = "title" style ={{textAlign: "right"}}>Experience the Staybook life</h2>
            <div className = "destinationContainer" style = {{flexDirection:'row-reverse'}}>
              <img src = {destinationImage} className = "destinationImage"></img>
                <div className = "destinationWrapper" style = {{alignItems:'start'}}>
                  <div className = "text" style ={{textAlign: "left"}}>We will help you experience life in staybook true sense. From living among the residents to eating authentic delicacies you are sure to walk home with memories and wonderful moments.</div>
                  <div className="glow-on-hover">Know More</div>
                </div>
            </div>
      </div>
  )
}

export default StayBookLife;