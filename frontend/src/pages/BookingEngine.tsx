import React,{useState,useEffect} from 'react';
import '../styles/App.scss';
import Amneties from '../components/Ameneties';
import BookingCard from '../components/BookingCard';
import NavBar from '../components/NavBar';
import Photos from '../components/PhotoSlider'
import RoomCard from '../components/RoomCard';
import axios from 'axios';

function App() {
  const [hotel,setHotel] = useState<any>(null) 

  const hotelName:string = new URL(window.location.href).pathname;


  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get(`http://localhost:8000/api${hotelName}/gethoteldata`).then(value => {
        setHotel(value.data)
      });
    }
    getHotelData();
  },[])

  return (
    <>
      <NavBar/>
      {hotel?
      <>
        <Photos data={Object.values(hotel.images)}/>
        <div className="container">
          <div>
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
              <p className="description">
                  {hotel.address}
              </p>
            </>
            <Amneties data={Object.values(hotel.amenities)}/>
            <h1 className="heading">{"Choose your room(s)"}</h1>
            {Object.values(hotel.rooms).map((room:any,i:number) =>(<RoomCard room={room} key={i}/>))}
          </div>
          <BookingCard/>
        </div>
      </>:<div>404</div>}
    </>
  );
}

export default App;
