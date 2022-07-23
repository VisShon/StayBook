import React from 'react';
import '../styles/App.scss';
import Amneties from '../components/Amneties';
import BookingCard from '../components/BookingCard';
import NavBar from '../components/NavBar';
import Photos from '../components/PhotoSlider'
import RoomCard from '../components/RoomCard';

function App() {
  return (
    <div className="container">
      <NavBar/>
      <Photos/>
      <h1 className="title">Title</h1>
      <div className="description">description</div>
      <Amneties/>
      <h1>Choose your room</h1>
      <RoomCard/>
      <BookingCard/>
    </div>
  );
}

export default App;
