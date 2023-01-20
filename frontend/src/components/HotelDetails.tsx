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

    let places: {a: {name: string, link: string},  b: {name: string, link: string}}[] = [];

    let nearbyPlaces: { nearby_place_name: string, nearby_place_link: string }[] = hotel.hotel_nearby_places;
    if (nearbyPlaces) {
        
        for (let i = 0; i < nearbyPlaces.length; i += 2) {
            places.push({
                a: {
                    name: nearbyPlaces[i].nearby_place_name,
                    link: nearbyPlaces[i].nearby_place_link
                },
                b: {
                    name: i + 1 < nearbyPlaces.length ? nearbyPlaces[i + 1].nearby_place_name : '',
                    link: i + 1 < nearbyPlaces.length ? nearbyPlaces[i + 1].nearby_place_link : ''
                }
            })
        }
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
            {nearbyPlaces && (
                <h2>Nearby Places</h2>)}
            {places.map((place: any) => (
                <div className="hotel-nearby-places">
                    {place.a.name && <a href={place.a.link}><p className="icontext"><PlaceIcon fontSize="inherit"/>{place.a.name}</p></a>}
                    {place.b.name && <a href={place.b.link}><p className="icontext"><PlaceIcon fontSize="inherit"/>{place.b.name}</p></a>}
                </div>
            ))}
        </div>
    )
}

export default HotelDetails;
