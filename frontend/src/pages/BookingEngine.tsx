import React,{useState} from 'react';
import '../styles/App.scss';
import Amneties from '../components/Ameneties';
import BookingCard from '../components/BookingCard';
import NavBar from '../components/NavBar';
import Photos from '../components/PhotoSlider'
import RoomCard from '../components/RoomCard';
import HotelsData from '../data/HotelData.json';

function App() {

  const[selectedPlans,setSelectedPlans] =useState([]);

  const hotel:any = HotelsData.jyotimahal;
  return (
    <>
      <NavBar/>
      <Photos data={hotel.images}/>
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

          <Amneties data={hotel.amenities}/>
          
          <h1 className="heading">{"Choose your room(s)"}</h1>
          {hotel.rooms.map((room:any,i:number) =>(<RoomCard room={room} key={i} setSelectedPlans={setSelectedPlans}/>))}
        </div>
        <BookingCard selectedPlans={selectedPlans}/>
      </div>
      
    </>
  );
}

export default App;
