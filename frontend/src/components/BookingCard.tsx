import React, { useState } from 'react'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import { useAppSelector} from '../app/hooks'
import { DatePicker,TimePicker } from 'react-rainbow-components';
import Button from './Button'

const style = {
  width: '10rem',
  marginTop: '1rem',
};


function BookingCard({selectedPlans}:any) {
  const [checkIn,setCheckIn] =useState();
  const [checkOut,setCheckOut] =useState();

  const netPrice = useAppSelector(state => state.price.value)
  const Plans = useAppSelector(state => state.plans.selectedPlans);

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
      <p>{Plans.length} rooms</p>

      {Plans.map((item,index) => (<SelectedPlan title={item.title} key={index}/>))}
      <AmountCard/>
      <Button/>
    </div>

  )
}

export default BookingCard