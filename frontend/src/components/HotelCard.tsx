import React,{useState} from 'react';
import '../styles/Hotel.scss';
import left from '../images/left.png'
import right from '../images/right.png'

export type Props ={
  name: string,
  slug:{current:string},
  rooms:{plans:{
    price:number
  }},
  description:string,
  images:[{
    asset: {
      url: string
    }
  }],
};

function HotelCard({name,images,rooms,slug,description}:Props) {
  const [n,setN] =useState(0); 
  return (
    <div className="hotelCard">
        <div className="images">
          <img src={images[n]?.asset.url} alt={name}/>
          <img className="left"      
               onClick={() => {
                    n == 0 ? setN(0) : setN((prev) => --prev)
                }}
                src={left} 
                alt={name}/>
          <img onClick={() => {
                    n == images.length - 1
                        ? setN(images.length - 1)
                        : setN((prev) => ++prev)
                }}
                className="right" 
                src={right} 
                alt={name}/>
        </div>
        <a href={`/${slug.current}`}>
          <h2>{name}</h2>
          <p>{description.slice(0,50)}...</p>
          <p><b>Starting ₹{rooms.plans.price}</b></p>
        </a>
    </div>
  )
};

export default HotelCard;