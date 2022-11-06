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
        <div>
          <h2>{name}</h2>
          <a>{address}</a>
          <p>{description}</p>
        </div>
        <img src={images?.asset.url} alt="image"/>
    </a>
  )
};

export default HotelCard;