import React, { useState } from 'react'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import { DatePicker,TimePicker } from 'react-rainbow-components';

function BookingCard({price,setPrice}:any) {
  const [checkIn,setCheckIn] =useState();
  const [checkOut,setCheckOut] =useState();
  const [numberOfRooms,setNumberOfRooms] =useState(0);

  return (
    <div className="bookingCard">
      <h1>₹{price}</h1>
      <div className="calendar">
        <div className="input">
          <div>
            Check In
            <DatePicker style={{marginRight:'10px'}}/>
          </div>
          <div>
            Check Out
            <DatePicker/>
          </div>
        </div>

        {/* <div className="input">
          <div>
            <TimePicker style={{marginRight:'10px'}}/>
          </div>
          <div>
            <TimePicker/>
          </div>
        </div> */}


      </div>
      <p>{numberOfRooms} rooms</p>
      <SelectedPlan/>
      <AmountCard/>
    </div>

  )
}

export default BookingCard