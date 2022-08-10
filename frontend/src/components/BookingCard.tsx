import React, { useState } from 'react'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import { useAppSelector} from '../app/hooks'

import Button from './Button'

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



const style = {
  width: '10rem',
  marginTop: '1rem',
};


function BookingCard() {
  const [checkIn, setCheckIn] = React.useState<Date | null>(null);
  const [checkOut, setCheckOut] = React.useState<Date | null>(null);


  const netPrice = useAppSelector(state => state.price.value)
  const Plans = useAppSelector(state => state.plans.selectedPlans);

  const checkAvailability = (checkIn:Date,checkOut:Date) => {
    let isAvailable:boolean=false;
    
    return isAvailable?<></>:<></>

  }

  return (
    <div className="bookingCard">
      <h1>₹{netPrice}</h1>
      <div className="calendar">
        <div className="input">
          <div style={{marginRight: '0.5rem'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue:any) => {
                  setCheckIn(newValue);
                }}
                renderInput={(params:any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  views={['day','month']}
                  label="Check Out"
                  value={checkOut}
                  onChange={(newValue:any) => {
                    setCheckOut(newValue);
                  }}
                  renderInput={(params:any) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
        </div>
        
      </div>
      <p>{Plans.length} rooms</p>

      {Plans.map((item,index) => (<SelectedPlan title={item.title} key={index}/>))}
      <AmountCard/>
      <Button user={""} checkOut={checkOut} checkIn={checkIn}/>
    </div>

  )
}

export default BookingCard