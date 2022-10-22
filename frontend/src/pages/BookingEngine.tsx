import React, { useState, useEffect } from 'react'
import '../styles/App.scss'
import Amneties from '../components/Ameneties'
import mmt from '../images/mmt.svg'
import mapImage from '../images/map.svg'
import bc from '../images/bc.svg'
import tra from '../images/tra.svg'
import light from '../images/light.png'
import BookingCard from '../components/BookingCard'
import Photos from '../components/PhotoSlider'
import PhotoGrid from '../components/PhotoGrid'
import RoomCard from '../components/RoomCard'
import { useParams } from 'react-router-dom'
import client from '../client'

function App() {
    const [hotel, setHotel] = useState<any>(null)
    const { slug } = useParams()
    const [gallery, setGallery] = useState<boolean>(false)
    const [isMinimized, setIsMinimized] = useState<boolean>(false)
    const guests = sessionStorage.getItem('guests')
    const prices = [150, 160, 90]

    useEffect(() => {
        client
            .fetch(
                `*[slug.current == "${slug}"]{
          name,
          description,
          phone,
          address,
          rooms[]{
            type,
            totalRooms,
            guests,
            info,
            plans,
            ameneties,
            image{
              asset -> {
                _id,
                url
              },
              alt
            },
          },
          email,
          map,
          amenities[]{
            "item":*[_type=='amenety' && _id ==^._ref][0]{
              name,
              image{asset -> {
                    _id,
                    url
                  },
                  alt
              },
            }
          },
          images[]{
            asset -> {
              _id,
              url
            },
            alt
          },
        }`
            )
            .then((data) => setHotel(data[0]))
    }, [])

    const MinPrice = () => {
        let MinPrice: number = 0
        let room: any = hotel.rooms.filter(
            (item: any) => item.guests == guests || !guests
        )[0]
        if (room) {
            MinPrice = room.plans[0].price
        }
        return MinPrice
    }

    return (
        <>
            {hotel ? (
                <>
                    {!isMinimized ? (
                        <div className="comparator">
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h2>Direct Price ₹{MinPrice()}</h2>
                                <div onClick={() => setIsMinimized(true)}>
                                    X
                                </div>
                            </div>
                            <div className="site">
                                <img src={bc} />
                                Booking.com
                                <p>
                                    ₹
                                    {MinPrice() +
                                        prices[Math.floor(Math.random() * 3)]}
                                </p>
                            </div>
                            <div className="site">
                                <img src={mmt} />
                                Make My Trip
                                <p>
                                    ₹
                                    {MinPrice() +
                                        prices[Math.floor(Math.random() * 3)]}
                                </p>
                            </div>
                            <div className="site">
                                <img src={tra} />
                                Trip Advisor
                                <p>
                                    ₹
                                    {MinPrice() +
                                        prices[Math.floor(Math.random() * 3)]}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="comparator"
                            onClick={() => setIsMinimized(false)}
                        >
                            <img
                                src={light}
                                style={{ width: '1.5rem', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    {gallery ? (
                        <Photos data={hotel.images} />
                    ) : (
                        <PhotoGrid data={hotel.images} />
                    )}
                    <div
                        className="galleryButton"
                        onClick={() => setGallery((prev) => !prev)}
                    >
                        {!gallery ? 'Open Gallery' : 'Close Gallery'}
                    </div>
                    <div className="Maincontainer">
                        <div className="sideContainer">
                            <h1 className="title">{hotel.name}</h1>
                            <>
                                <p className="contact">
                                    <span className="detail">
                                        PHONE:
                                        <span
                                            style={{
                                                color: 'black',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {hotel.phone}
                                        </span>
                                    </span>
                                    <span className="detail">
                                        EMAIL:
                                        <span
                                            style={{
                                                color: 'black',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {hotel.email}
                                        </span>
                                    </span>
                                </p>
                                <a href={hotel.map} className="description" style={{fontSize:'1rem'}}>
                                    <img src={mapImage}/>
                                    {hotel.address}
                                </a>
                                <p className="description">
                                    {hotel.description}
                                </p>
                            </>
                            <Amneties data={hotel.amenities} />

                            <h1 className="heading">{'Choose your room(s)'}</h1>
                            {hotel.rooms
                                .filter(
                                    (item: any) =>
                                        item.guests == guests || !guests
                                )
                                .map((room: any, i: number) => (
                                    <RoomCard room={room} key={i} />
                                ))}
                        </div>
                        <BookingCard hotelName={hotel.name} address={hotel.address} />
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default App
