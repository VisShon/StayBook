import React, { useState } from 'react'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import { DatePicker,TimePicker } from 'react-rainbow-components';

const style = {
  width: '10rem',
  marginTop: '1rem',
};


function BookingCard({selectedPlans}:any) {
  const [checkIn,setCheckIn] =useState();
  const [checkOut,setCheckOut] =useState();
  const[netPrice,setNetPrice] = useState(0);

  return (
    <div className="bookingCard">
      <h1>₹{netPrice}</h1>
      <div className="calendar">
        <div className="input">
          <div>
            Check In
            <DatePicker style={style} />
          </div>
          <div>
            Check Out
            <DatePicker style={style}/>
          </div>
        </div>

        <div className="input">
          <div>
            <TimePicker style={style}/>
          </div>
          <div>
            <TimePicker style={style}/>
          </div>
        </div>


      </div>
      {/* <p>{selectedPlans} rooms</p> */}
      <AmountCard/>
    </div>

  )
}

export default BookingCard