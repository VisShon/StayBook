import React,{useState,useEffect} from 'react';
import '../styles/App.scss';
import Amneties from '../components/Ameneties';
import BookingCard from '../components/BookingCard';
import NavBar from '../components/home/Navbar';
import Photos from '../components/PhotoSlider'
import PhotoGrid from '../components/PhotoGrid'
import RoomCard from '../components/RoomCard';
import axios from 'axios';

function App() {
  const [hotel,setHotel] = useState<any>(null) ;
  const [gallery,setGallery] = useState<boolean>(false);
  const hotelName:string = new URL(window.location.href).pathname;
  const guests = sessionStorage.getItem('guests');


  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get(`/api${hotelName}/gethoteldata`).then(value => {
        setHotel(value.data)
      });
    }
    getHotelData();
  },[])

  return (
    <>
      {hotel?
      <>
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
