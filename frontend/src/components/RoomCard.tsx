import React,{useState} from 'react'
import '../styles/RoomCard.scss'
import PlanCard from './PlanCard'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ImageGallery from 'react-image-gallery';

const prepareImages = (images: any) => {
    let imagesArray = images.map((image: any) => (
        {
            original: image.asset.url + '?w=950&h=750',
            thumbnail: image.asset.url + '?w=250&h=150',
        }
    ))
    return imagesArray
}

function RoomCard({ room, onSelect }: any) {
    const [modal, setModal] = useState(false)
    const roomAmenities = room.ameneties.split(", ")
    const images = prepareImages(room.images)
    return (
        <>
            <div className="roomCard">
                <div className="roomInfo">
                    <div>
                        <h2>{room.type}</h2>
                        <p>{room.info}</p>
                        <div className="button" onClick={() => setModal(!modal)}>More Info</div>
                        <div className={modal ? "roomPopUp-container" : "hidden"} onClick={() => setModal(!modal)}>
                            <div className="roomPopUp" onClick={e => e.stopPropagation()}>
                                <span className="popup-close" onClick={() => setModal(!modal)}><CloseIcon fontSize="inherit"/></span>
                                <div className="roomPopUp-images">
                                    <ImageGallery items={images} />
                                    <h2>{room.type}</h2>
                                    <p>{room.info}</p>
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
                        </div>
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
                        onSelect={onSelect}
                        key={i}
                    />
                ))}
            </div>
        </>
    )
}

export default RoomCard
