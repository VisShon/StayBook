import React,{useState,useEffect,useRef} from 'react';
import '../styles/App.scss';
import Amneties from '../components/Ameneties';
import mmt from '../images/mmt.svg';
import bc from '../images/bc.svg';
import tra from '../images/tra.svg';
import BookingCard from '../components/BookingCard';
import Photos from '../components/PhotoSlider'
import PhotoGrid from '../components/PhotoGrid'
import RoomCard from '../components/RoomCard';
import axios from 'axios';



function App() {
  const [hotel,setHotel] = useState<any>(null);
  const [gallery,setGallery] = useState<boolean>(false);
  const hotelName:string = new URL(window.location.href).pathname;
  const guests = sessionStorage.getItem('guests');
  const prices = [150,160,90];
  const comparator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get(`/api${hotelName}/gethoteldata`).then(value => {
        setHotel(value.data)
      });
    }
    getHotelData();

    window.addEventListener("scroll", () => {
      comparator.current!.style.opacity = '0';
    })
    window.addEventListener("mousemove", () => {
      comparator.current!.style.opacity = '1';
    })
  },[])

  const MinPrice = () => {
    let MinPrice:number=0;
    let room:any =Object.values(hotel.rooms)
                        .filter((item:any) => item.info.substring(8,9)==guests||!guests)[0];
    if(room){
      MinPrice = room.plans[0].price;
    }
    return MinPrice;
  }

  return (
    <>
      {hotel?
      <>
        <div className='comparator' ref={comparator}>
          <h2>Direct Price ₹{MinPrice()}</h2>
          <div className='site'><img src={bc}/>Booking.com
            <p>₹{MinPrice()+prices[Math.floor(Math.random()*3)]}</p>
          </div>
          <div className='site'><img src={mmt}/>Make My Trip
            <p>₹{MinPrice()+prices[Math.floor(Math.random()*3)]}</p>
          </div>
          <div className='site'><img src={tra}/>Trip Advisor
            <p>₹{MinPrice()+prices[Math.floor(Math.random()*3)]}</p>            
          </div>
        </div>

        {gallery?<Photos data={Object.values(hotel.images)}/>:<PhotoGrid data={Object.values(hotel.images)}/>}
        <div className="galleryButton"
              onClick={()=>setGallery(prev=>!prev)}>{!gallery?('Open Gallery'):('Close Gallery')}</div>
        <div className="Maincontainer">
          <div className="sideContainer">
            <h1 className="title">{hotel.name}</h1>
            <>
              <p className="description">
                  <span className="detail">PHONE:
                    <span style={{color: 'black', fontWeight: '400'}}>{hotel.phone}</span>
                  </span>
                  <span className="detail">EMAIL:
                    <span style={{color: 'black', fontWeight: '400'}}>{hotel.email}</span>
                  </span>
              </p>
              <a href={hotel.map} className="description">
                  {hotel.address}
              </a>
            </>
            <Amneties data={Object.values(hotel.amenities)}/>
            <h1 className="heading">{"Choose your room(s)"}</h1>

            
            {Object.values(hotel.rooms).filter((item:any) => item.info.substring(8,9)==guests||!guests).map((room:any,i:number) =>(<RoomCard room={room} key={i}/>))}
          </div>
          <BookingCard/>
        </div>
      </>:<div>404</div>}
    </>
  );
}

export default App;
