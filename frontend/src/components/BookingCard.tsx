import React, { useState } from 'react'
import '../styles/BookingCard.scss'
import DatePicker from 'react-date-picker'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'

function BookingCard({price,setPrice}:any) {
  const [checkIn,setCheckIn] =useState();
  const [checkOut,setCheckOut] =useState();

  return (
    <div className="bookingCard">
      <h1>₹{price}</h1>
      <div className="calendar">
        <div className="input">
          <div>
            Check In
            <DatePicker/>
          </div>
          <div>
            Check Out
            <DatePicker/>
          </div>
        </div>

        <div className="input">
          <div>
            <div/>
          </div>
          <div>
            <div/>
          </div>
        </div>
      </div>
      <p>number of rooms</p>
      <SelectedPlan/>
      <AmountCard/>
    </div>

  )
}

export default BookingCard