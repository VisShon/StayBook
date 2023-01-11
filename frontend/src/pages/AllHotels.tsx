import React, { useState, useEffect } from 'react';
import '../styles/Hotel.scss';
import HotelCard,{Props}from '../components/HotelCard';
import client from '../client';
import {Helmet} from 'react-helmet';
import Spinner from '../components/Spinner';


function AllHotels() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      client
          .fetch(
             `*[_type == "hotel"]{
                    name,
                    slug,
                    rating,
                    card_amenities,
                    rooms[0]{
                     plans[0],
                    },
                    images[]{
                     asset -> {url},
                    }
              }`
          )
          .then((data) => setData(data))
          .then(()=>setIsLoading(false))
  }, [])
  return (
    <>
      <Helmet>
          <title>{`StayBook Hotels`}</title>
          <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
      </Helmet>
      {isLoading? <Spinner />:
      <>
      <h1 className='hotelTitle'>StayBook Hotels</h1>
      <div className="hotelContainer">
        {data!.map((hotel:Props,index:number)=>(<HotelCard name={hotel!.name} 
          rooms={hotel!.rooms}
          images={hotel!.images}
          slug={hotel!.slug}
          rating={hotel!.rating}
          key={index}
          card_amenities={hotel!.card_amenities}/>))}
      </div>
      </>}
    </>
  )
}

export default AllHotels
