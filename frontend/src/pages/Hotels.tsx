import React, { useState, useEffect } from 'react';
import '../styles/Hotel.scss';
import HotelCard,{Props}from '../components/HotelCard';
import { useParams } from 'react-router-dom';
import client from '../client';
import {Helmet} from 'react-helmet';
import Spinner from '../components/Spinner';

export type data ={
  name: string,
  hotels:Array<{
    hotel:Props
  }>,
}

function Hotels() {
  const [data, setData] = useState<data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { slug } = useParams();

  useEffect(() => {
      client
          .fetch(
             `*[slug.current == "${slug}"] {
                  name,
                  hotels[]{
                    "hotel":*[_type=='hotel' && _id ==^._ref][0]{
                      name,
                      slug,
                      description,
                      rating,
                      rooms[0]{
                        plans[0],
                      },
                      images[]{
                        asset -> {url},
                      }
                    }
                  },
              }`
          )
          .then((data) => setData(data[0]))
          .then(()=>setIsLoading(false))
  }, [slug])
  return (
    <>
      <Helmet>
          <title>{`StayBook Hotels`}</title>
          <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
      </Helmet>
      {isLoading? <Spinner />:
      <>
      <h1 className='hotelTitle'>{data!.name}</h1>
      <div className="hotelContainer">
        {data!.hotels.map(item=>item.hotel)
        .map((hotel:Props,index:number)=>(<HotelCard name={hotel!.name} 
          rooms={hotel!.rooms}
          images={hotel!.images}
          slug={hotel!.slug}
          rating={hotel!.rating}
          key={index}/>))}
      </div>
      </>}
    </>
  )
}

export default Hotels
