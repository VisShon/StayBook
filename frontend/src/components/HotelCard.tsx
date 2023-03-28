import {useState} from 'react';
import '../styles/Hotel.scss';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import left from '../images/left.png'
import right from '../images/right.png'
import vip from '../images/VIP.svg'
import { format } from 'date-fns'
import { useNavigate, useSearchParams} from "react-router-dom";

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
  rating:number,
  card_amenities: string
  card_amenities_ref: any
  checkIn:Date
  checkOut:Date
};


function HotelCard({name,images,rooms,slug,rating,card_amenities,card_amenities_ref, checkIn, checkOut}:Props) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [n,setN] =useState(0); 
  const navigate = useNavigate();
  const checkInDate = checkIn.toLocaleDateString('en-IN')
                              .replace("/","-");
  const checkOutDate = checkOut.toLocaleDateString('en-IN')
                              .replace("/","-");

  const onClickHandler = () => {
    setSearchParams({

    })
    navigate({
      pathname:`/${slug.current}`,
      search:`?${searchParams}`
    })
  }

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

        <div onClick={onClickHandler}>
          <h2>{name}</h2>
          {!card_amenities_ref && card_amenities && (<p className="card-amenities">{card_amenities}</p>)}
          {card_amenities_ref && (
            <div className="card-amenities-icons">
              {card_amenities_ref.map((amenity: any) => (
                <img
                    src={amenity.item.image?.asset.url}
                    style={{ width: '2rem' }}
                    alt={amenity.item.name}
                />
              ))}
            </div>
          )}
          <div className="ratingContainer">
            <div className="rating">
              {new Array(Math.max(3, rating)).fill(0).map((item, i)=>(
              <StarIcon fontSize="small" key={i}/>
              ))}
            </div>
          </div>
            <p>₹{rooms.plans.price} <ArrowForwardIosIcon /></p>
        </div>
    </div>
  )
};

export default HotelCard;
