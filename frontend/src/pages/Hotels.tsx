import React, { useState, useEffect } from 'react';
import '../styles/Hotel.scss';
import HotelCard,{Props}from '../components/HotelCard';
import { useParams } from 'react-router-dom';
import client from '../client';

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
                      address,
                      images[0]{
                        asset -> {url},
                      }
                    }
                  },
              }`
          )
          .then((data) => setData(data[0]))
          .then(()=>setIsLoading(false))
  }, [])
  return (
    <>
      {isLoading?<div>Loading...</div>:
      <>
      <h1>{data!.name}</h1>
      <div className="hotelContainer">
        {data!.hotels.map(item=>item.hotel)
        .map((hotel:Props,index:number)=>(<HotelCard name={hotel!.name} 
          description={hotel!.description}
          address={hotel!.address} 
          images={hotel!.images}
          slug={hotel!.slug}
          key={index}/>))}
      </div>
      </>}
    </>
  )
}

export default Hotels