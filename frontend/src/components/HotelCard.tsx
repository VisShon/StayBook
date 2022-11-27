import React from 'react';
import '../styles/Hotel.scss';

export type Props ={
  name: string,
  slug:{current:string},
  rooms:{plans:{
    price:number
  }},
  description:string,
  images:{
    asset: {
      url: string
    }
  },
};

function HotelCard({name,images,rooms,slug,description}:Props) {
  console.log(rooms)
  return (
    <div   
        className="hotelCard">
        <img src={images?.asset.url} alt={name}/>
        <div>
          <h2>{name}</h2>
          <p>{description.slice(0,50)}...</p>
          <p><b>Starting ₹{rooms.plans.price}</b></p>
          <a href={`/${slug.current}`} >Book Now</a>
        </div>
    </div>
  )
};

export default HotelCard;