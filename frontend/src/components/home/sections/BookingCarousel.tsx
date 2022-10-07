import React,{ useEffect,useState } from 'react'
import '../../../styles/home/BookingCarousel.scss'
import {motion,useAnimation} from 'framer-motion'
import Hotels from '../../../data/hotelData.json'
import leftArrow from '../../../images/leftArrow2.svg'
import rightArrow from '../../../images/rightArrow2.svg'
import arrow from '../../../images/arrowVector.svg'
import guest from '../../../images/guests.svg'
import hotel from '../../../images/hotel.svg'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const boxVariant = {
  visible: { opacity: 1, translateX: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, translateX: '10vw' }
};

function BookingCarousel() {

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(0);

  const control = useAnimation();
  const [n,setN] = useState(0);
  const data = Object.values(Hotels);

  const setHotel=() => {

  }
  
  useEffect(() => {
    control.start("hidden");
    control.start("visible");
}, [control, n]);

  
  return (
      <div className='carouselBody'>

          <motion.div
            className='imageCard'
            initial='hidden'
            variants={boxVariant}
            animate={control}>
            <img src={require('../../../images/'+(Object.values(data[n].images))[4])}/>
          </motion.div>

          <h1>{data[n].name}</h1>
          <h2>Book Your Stay</h2>

          <div className='bookingBar'>
              <a href={data[n].link} className='arrowButton'>
                <img src={arrow}/>
              </a>

              <div className='line'></div>

              <div className='guests'>
                  <input type='number' value={guests} min='0' max='3'/>
                  <div className='change'>
                    <a onClick={()=>{guests==0?setGuests(0):setGuests(prev=>--prev)}} 
                       className='changeValue' 
                       style={guests==0?{color: 'grey'}:{color: 'black'}}>-</a>
                    <img src={guest} style={{height: '1.5rem'}}/>
                    <a onClick={()=>{guests==3?setGuests(3):setGuests(prev=>++prev)}} 
                       className='changeValue' 
                       style={guests==3?{color: 'grey'}:{color: 'black'}}>+</a>
                  </div>
              </div>

              <div className='line'></div>

              <div className='input'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['day','month']}
                      label="Check Out"
                      value={checkOut}
                      onChange={(newValue:any) => {
                        setCheckOut(newValue);
                        sessionStorage.setItem('checkOut',newValue);
                      }}
                      renderInput={({ inputRef, inputProps, InputProps }) => (
                        <Box sx={{alignItems:'center',display:'flex',width:'8rem',flexDirection:'column'}}>
                          <input  ref={inputRef} {...inputProps}  
                          placeholder='Check Out'/>
                          {InputProps?.endAdornment}
                        </Box>
                      )}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Check In"
                    value={checkIn}
                    onChange={(newValue:any) => {
                      setCheckIn(newValue);
                      sessionStorage.setItem('checkIn',newValue);
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box sx={{alignItems:'center',display:'flex',width:'8rem',flexDirection:'column'}}>
                        <input ref={inputRef} {...inputProps} 
                        placeholder="Check In" />
                        {InputProps?.endAdornment}
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div className='line'></div>

              <div className="search">
                    <img src={hotel} style={{height: '1.5rem'}}/>
                    <input type="text" value={data[n].name}/>
              </div>
          </div>


          <div className='carouselArrows'>
            <img src={leftArrow} 
                 onClick={()=>{setN(prev=>prev==0?prev:--prev);
                n!==0?control.set('hidden'):control.set('visible');}}/>
            <img src={rightArrow} 
                 onClick={()=>{setN(prev=>prev==data.length-1?prev:++prev);
                n!==data.length-1?control.set('hidden'):control.set('visible');;}}/>
          </div>
      </div>
  )
}

export default BookingCarousel