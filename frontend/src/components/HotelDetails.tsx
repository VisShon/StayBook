import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PlaceIcon from '@mui/icons-material/Place';
import '../styles/HotelDetails.scss'

const HotelDetails = (props: any) => {
    let hotel = props.hotel
    let amenities: string[] = hotel.hotel_amenities;
    let chunkSize: number = Math.max(1, Math.ceil(amenities.length / 3))
    let amenityArray1: string[] = amenities.slice(0, chunkSize)
    let amenityArray2: string[] = amenities.slice(chunkSize, 2 * chunkSize)
    let amenityArray3: string[] = amenities.slice(2 * chunkSize)

    let places: {a: string, b: string}[] = [];

    let nearbyPlaces: string[] = hotel.hotel_nearby_places;
    for (let i = 0; i < nearbyPlaces.length; i += 2) {
        places.push({
            a: nearbyPlaces[i],
            b: (i + 1 < nearbyPlaces.length ? nearbyPlaces[i + 1] : '')
        })
    }


    return (
        <div className="hoteldetails">
            {hotel.hotel_description.map((desc: string) => {
                let boldIndex = desc.indexOf('-')
                if (boldIndex != -1) {
                    return <p><b>{desc.substring(0, boldIndex)}</b> {desc.substring(boldIndex)}</p>
                }

                return <p>{desc}</p>
            })}
            <h2>Hotel Amenities</h2>
            <div className="hotel-amenities">
                <div>
                    {amenityArray1.map((amenity: string) => (
                        <p className="icontext"><CheckIcon fontSize="inherit"/> {amenity}</p>
                    ))}
                </div>
                <div>
                    {amenityArray2.map((amenity: string) => (
                        <p className="icontext"><CheckIcon fontSize="inherit"/> {amenity}</p>
                    ))}
                </div>
                <div>
                    {amenityArray3.map((amenity: string) => (
                        <p className="icontext"><CheckIcon fontSize="inherit"/> {amenity}</p>
                    ))}
                </div>
            </div>
            <h2>Nearby Places</h2>
            {places.map((place: any) => (
                <div className="hotel-nearby-places">
                    <p className="icontext"><PlaceIcon fontSize="inherit"/>{place.a}</p>
                    {place.b && <p className="icontext"><PlaceIcon fontSize="inherit"/>{place.b}</p>}
                </div>
            ))}
        </div>
    )
}

export default HotelDetails;
