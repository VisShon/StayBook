import React,{useState} from 'react';
import '../styles/Hotel.scss';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import left from '../images/left.png'
import right from '../images/right.png'
import vip from '../images/vip.png'

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
          <img className="vip" src={vip} />
        </div>

        <a href={`/${slug.current}`}>
          <h2>{name}</h2>
          <div className="ratingContainer">
            Rating:
            <div className="rating">
              <StarIcon fontSize="medium"/>
              <StarIcon fontSize="medium"/>
              <StarIcon fontSize="medium"/>
              <StarIcon fontSize="medium"/>
            </div>
          </div>
            <p><b>Starting ₹{rooms.plans.price}</b> <ArrowForwardIosIcon /></p>
        </a>
    </div>
  )
};

export default HotelCard;
