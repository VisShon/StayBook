import React, { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { removePlan } from '../app/planSlice';
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import { useAppSelector} from '../app/hooks'

import Button from './Button'

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function BookingCard() {
  let today = new Date();
  let tomorrow =  new Date();
  tomorrow.setDate(today.getDate() + 1);

  const CheckOutDate = sessionStorage.getItem('checkOut');
  const CheckInDate = sessionStorage.getItem('checkIn');

  const [checkIn, setCheckIn] = React.useState<Date | null>(CheckInDate?new Date(CheckInDate):today);
  const [checkOut, setCheckOut] = React.useState<Date | null>(CheckOutDate?new Date(CheckOutDate):tomorrow);

  const dispatch = useAppDispatch();

  const withoutTax = useAppSelector(state => state.price.withoutTax);
  const Plans = useAppSelector(state => state.plans.selectedPlans);

  useEffect(() => {
    dispatch(removePlan({title:"Monthly Rate",roomType:"Deluxe Suite"}))
  },[])
  
  return (
    <div className="bookingCard">
      <a href={''}>Terms and Conditions</a>
      <h1>₹{withoutTax}</h1>
      <div className="calendar">
        <div className="input">
          <div style={{marginRight: '0.5rem'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check In"
                value={checkIn}
                minDate={new Date()}
                onChange={(newValue:any) => {
                  setCheckIn(newValue);
                }}
                renderInput={(params:any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day','month']}
                  label="Check Out"
                  value={checkOut}
                  minDate={new Date()}
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


      <div className="selectedPlans">
        {Plans.map((item,index) => (<SelectedPlan roomType={item.roomType} title={item.title} checkOut={checkOut} checkIn={checkIn} key={index}/>))}
      </div>

      
      <AmountCard checkOut={checkOut} checkIn={checkIn}/>
      <Button checkOut={checkOut} checkIn={checkIn} />
      
    </div>

  )
}

export default BookingCard