import React from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'

function RoomCard({room}:any) {

  return (
    <div className="roomCard">
      <div className="roomInfo">
        <h2>
          {room.type}
          <p>{room.info}</p>
        </h2>
        <img src={require("../images/"+room.image)} className="roomImage"/>
      </div>
      {Object.values(room.plans).map((plan:any, i:number) =>(<PlanCard room={room.type} plan={plan} amenities={room.amenities} key={i}/>))}
    </div>
  )
}

export default RoomCard