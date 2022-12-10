import React,{useState} from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import left from '../images/left.png'
import right from '../images/right.png'

function RoomCard({ room }: any) {
    const [n,setN] =useState(0); 
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
                            <img className="left"      
                                 onClick={() => {
                                        n == 0 ? setN(0) : setN((prev) => --prev)
                                    }}
                                    src={left} 
                                    alt={room.type}/>
                            <img onClick={() => {
                                    n == room.images.length - 1
                                        ? setN(room.images.length - 1)
                                        : setN((prev) => ++prev)
                                }}
                                className="right" 
                                src={right} 
                                alt={room.type}/>
                            <h2>{room.type}</h2>
                            <p>{room.description}</p>
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
