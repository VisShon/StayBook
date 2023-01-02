import React,{useState} from 'react';
import '../styles/Hotel.scss';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import left from '../images/left.png'
import right from '../images/right.png'
import vip from '../images/VIP.svg'

export type Props ={
  name: string,
  slug:{current:string},
  rooms:{plans:{
    price:number
  }},
  images:[{
    asset: {
      url: string
    }
  }],
  rating:number
};

function HotelCard({name,images,rooms,slug,rating}:Props) {
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
          <img className="vip" src={vip} />
        </div>

        <a href={`/${slug.current}`}>
          <h2>{name}</h2>
          <div className="ratingContainer">
            <div className="rating">
              {new Array(Math.max(3, rating)).fill(0).map((item, i)=>(
              <StarIcon fontSize="small" key={i}/>
              ))}
            </div>
          </div>
            <p>₹{rooms.plans.price} <ArrowForwardIosIcon /></p>
        </a>
    </div>
  )
};

export default HotelCard;
