import React,{useState} from 'react'
import 'reactjs-popup/dist/index.css';
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'
import CheckIcon from '@mui/icons-material/Check';
import Popup from 'reactjs-popup';
import left from '../images/left.png'
import right from '../images/right.png'

function RoomCard({ room }: any) {
    const [n,setN] =useState(0); 
    const roomAmenities = room.ameneties.split(", ")
    return (
        <>
            <div className="roomCard">
                <div className="roomInfo">
                    <div>
                        <h2>{room.type}</h2>
                        <p>{room.info}</p>
                    <Popup trigger={<div className="button">More Info</div>} position="right center" modal>
                    <div className="roomPopUp">
                        <div className="roomPopUp-images-container">
                            <div className="roomPopUp-images">
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
                                <p>{room.info}</p>
                            </div>
                        </div>
                        <div>
                            <h2>What We Offer</h2>
                            <div className="roomPopUp-ameneties">
                                {roomAmenities.map((amenity: any) => (
                                    <span><CheckIcon fontSize="inherit" /> {amenity}</span>
                                ))}
                            </div>
                        </div>
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
