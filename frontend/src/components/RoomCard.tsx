import React from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function RoomCard({ room }: any) {
    return (
        <>
            <div className="roomCard">
                <div className="roomInfo">
                    <div>
                        <h2>{room.type}</h2>
                        <p>{room.info}</p>
                    <Popup trigger={<div className="button">More Info</div>} position="right center" modal>
                        <div className="roomPopUp">
                            <img src={room.image.asset.url} className="roomImage" alt={room.type}/>
                            <h2>{room.type}</h2>
                            <p>{room.ameneties}</p>
                        </div>
                    </Popup>
                    </div>
                    <img src={room.image.asset.url} className="roomImage" alt={room.type}/>
                </div>
                {room.plans.map((plan: any, i: number) => (
                    <PlanCard
                        maxCap={room.totalRooms}
                        room={room.type}
                        plan={plan}
                        amenities={room.ameneties}
                        guests={room.guests}
                        key={i}
                    />
                ))}
            </div>
        </>
    )
}

export default RoomCard
