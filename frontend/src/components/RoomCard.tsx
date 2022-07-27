import React from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'

function RoomCard({room,setSelectedPlans}:any) {
  return (
    <div className="roomCard">
      <div className="roomInfo">
        <h2 style={{}}>
          {room.type}
          <p>{room.info}</p>
        </h2>
        <img src={require("../images/"+room.image)} className="roomImage"/>
      </div>
      {room.plans.map((plan:any, i:number) =>(<PlanCard plan={plan} key={i} setSelectedPlans={setSelectedPlans}/>))}
    </div>
  )
}

export default RoomCard