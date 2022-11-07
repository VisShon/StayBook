import React from 'react';
import '../styles/Hotel.scss';

export type Props ={
  name: string,
  address: string,
  slug:{current:string},
  description:string,
  images:{
    asset: {
      url: string
    }
  },
};

function HotelCard({name,address,images,slug,description}:Props) {
  return (
    <a  href={`/${slug.current}`}     
        className="hotelCard">
        <img src={images?.asset.url} alt="image"/>
        <div>
          <h2>{name}</h2>
          <a>{address}</a>
          <p>{description.slice(0,100)}...</p>
        </div>
    </a>
  )
};

export default HotelCard;