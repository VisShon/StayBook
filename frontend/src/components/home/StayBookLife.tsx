import React from 'react'
import '../../styles/home/TopDestinations.scss';
import destinationImage from '../../images/life.jpg';
function StayBookLife() {
  const wind = window.matchMedia('(max-width: 800px)');
  return (
  
      <div className ="header">
        <h2 className = "title" style ={!wind.matches?{textAlign: "right"}:{textAlign: "center"}}>Experience the Staybook life</h2>
            <div className = "destinationContainer" style = {!wind.matches?{flexDirection:'row-reverse'}:{flexDirection:'column'}}>
              <img src = {destinationImage} className = "destinationImage"></img>
                <div className = "destinationWrapper" style = {!wind.matches?{alignItems:'start'}:{alignItems:'center'}}>
                  <div className = "text" style ={!wind.matches?{textAlign: "left"}:{textAlign:'center'}}>We will help you experience life in staybook true sense. From living among the residents to eating authentic delicacies you are sure to walk home with memories and wonderful moments.</div>
                  <div className="glow-on-hover">Know More</div>
                </div>
            </div>
      </div>
  )
}

export default StayBookLife;