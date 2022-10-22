import React from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'

function RoomCard({ room }: any) {
    return (
        <div className="roomCard">
            <div className="roomInfo">
                <h2>
                    {room.type}
                    <p>{room.info}</p>
                </h2>
                <img src={room.image.asset.url} className="roomImage" />
            </div>
            {room.plans.map((plan: any, i: number) => (
                <PlanCard
                    maxCap={room.totalRooms}
                    room={room.type}
                    plan={plan}
                    amenities={room.ameneties}
                    key={i}
                />
            ))}
        </div>
    )
}

export default RoomCard
