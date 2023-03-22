import React,{useState} from 'react';
import '../styles/Hotel.scss';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import left from '../images/left.png'
import right from '../images/right.png'
import vip from '../images/VIP.svg'
import { format } from 'date-fns'

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import HotelContext from '../context/hotel-context';

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
};

const hotelMap = {
  "aira-xing": 24669,
  "jyoti-mahal": 25095,
  "jai-balaji": 23690,
  "pinky-villa": 23540,
  "atlanta-near-new-delhi-train-station": 4,
  "staybook-woods-view": 5,
  "shiv-dev": 6,
  "staybook-blue-sky-camp": 7,
  "staybook-south-delhi": 23719,
  "staybook-city-stories-new-delhi-train-station": 9,
};

function getHotelUniqueId(hotelName: string) {
  if (hotelName === "aira-xing") {
    return "24669";
  }
  else if (hotelName === "jyoti-mahal") {
    return "25095";
  }
  else if (hotelName === "jai-balaji") {
    return "23690";
  }
  else if (hotelName === "pinky-villa") {
    return "23540";
  }
  else if (hotelName === "staybook-south-delhi") {
    return "23719";
  }
  else {
    return "12345";
  }
}

function getHotelNameFromHotelId(hotelId: string) {
  if (hotelId === "24669") {
    return "aira-xing";
  }
  else if (hotelId === "25095") {
    return "jyoti-mahal";
  }
  else if (hotelId === "23690") {
    return "jai-balaji";
  }
  else if (hotelId === "23540") {
    return "pinky-villa";
  }
  else if (hotelId === "23719") {
    return "staybook-south-delhi";
  }
  else {
    return "shiv-dev";
  }
}

function HotelCard({name,images,rooms,slug,rating,card_amenities,card_amenities_ref}:Props) {
  const hotelCtx = React.useContext(HotelContext);
  const hotelCode = getHotelUniqueId(slug.current);
  const navigate = useNavigate();
  var checkIn = format(hotelCtx.checkIn as Date, 'dd/MM/yyyy');
  var checkOut = format(hotelCtx.checkOut as Date, 'dd/MM/yyyy');
  var checkInSplit = checkIn.toString().split("/");
  var checkOutSplit = checkOut.toString().split("/");
  var checkInInfo = `${checkInSplit[0]}-${checkInSplit[1]}-${checkInSplit[2]}`;
  var checkOutInfo = `${checkOutSplit[0]}-${checkOutSplit[1]}-${checkOutSplit[2]}`;
  // const [searchParams, setSearchParams] = useSearchParams({checkin: checkInInfo, num_nights: 1, num_guests: 2, hotel_Id: hotelCode});
  const [searchParams, setSearchParams] = useSearchParams({checkin: checkInInfo, num_nights: hotelCtx.numOfNights.toString(), num_guests: hotelCtx.numOfGuests.toString(), hotel_id: hotelCode});

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

        {/* <a href={`/${slug.current}/${checkInInfo}/${checkOutInfo}`}> */}
        {/* <a href={`/${slug.current}`}> */}
        {/* <a href={`/hotel/google/list/${hotelCode}/${searchParams}/${slug.current}`}> */}
        <a href={`/hotel/google/list/${hotelCode}/${searchParams}`}>
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
        </a>
    </div>
  )
};

export default HotelCard;
