import React from 'react';
import '../styles/App.scss';
import Amneties from '../components/Amneties';
import BookingCard from '../components/BookingCard';
import NavBar from '../components/NavBar';
import Photos from '../components/PhotoSlider'
import RoomCard from '../components/RoomCard';
import HotelsData from '../data/HotelData.json';

function App() {
  const hotel:any = HotelsData.jyotimahal;
  return (
    <>
      <NavBar/>
      <div className="container">
        <Photos data={hotel.images}/>
        <h1 className="title">{hotel.name}</h1>

        <>
          <p className="description">
              <span className="detail">PHONE:
                <span style={{color: 'black'}}>{hotel.phone}</span>
              </span>
              <span className="detail">EMAIL:
                <span style={{color: 'black'}}>{hotel.email}</span>
              </span>
          </p>
          <p className="description">
              {hotel.address}
          </p>
        </>

        <Amneties data={hotel.amneties}/>
        <h1>Choose your room</h1>
        <RoomCard/>
        <BookingCard/>
      </div>
    </>
  );
}

export default App;
