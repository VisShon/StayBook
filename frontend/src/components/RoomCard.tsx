import React from 'react'
import '../styles/RoomCard.scss'
import PalnCard from './PlanCard'

function RoomCard({room}:any) {
  return (
    <div className="roomCard">
      <div className="roomInfo">
        <h2 style={{}}>
          {room.type}
          <p>{room.info}</p>
        </h2>
        <img src={require("../images/"+room.image)} className="roomImage"/>
      </div>

      <PalnCard/>
    </div>
  )
}

export default RoomCard