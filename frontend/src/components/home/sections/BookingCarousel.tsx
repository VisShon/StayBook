import React,{ useEffect,useState } from 'react'
import {motion,useAnimation} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../../../styles/home/BookingCarousel.scss'


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
  const [guests, setGuests] = useState(2);
  const [n,setN] = useState(0);
  const [suggestions,setSuggestions] = useState<any[]>([]);
  const control = useAnimation();
  const nav = useNavigate();
  const data = Object.values(Hotels);

  const onSubmit = () => {
    sessionStorage.setItem('guests',guests.toString());
    nav(data[n].link);
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
              <div onClick={onSubmit} className='arrowButton'>
                <img src={arrow}/>
              </div>

              <div className='line'></div>

              <div className='guests'>
                  <input type='number' value={guests} min='2' max='3'/>
                  <div className='change'>
                    <a onClick={()=>{guests==2?setGuests(2):setGuests(prev=>--prev)}} 
                       className='changeValue' 
                       style={guests==2?{color: 'grey'}:{color: 'black'}}>-</a>
                    <img src={guest} style={{height: '1.5rem'}}/>
                    <a onClick={()=>{guests==4?setGuests(4):setGuests(prev=>++prev)}} 
                       className='changeValue' 
                       style={guests==4?{color: 'grey'}:{color: 'black'}}>+</a>
                  </div>
              </div>

              <div className='line'></div>

              <div className='input'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['day','month']}
                      label="Check Out"
                      value={checkOut}
                      minDate={new Date()}
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
                    minDate={new Date()}
                    onChange={(newValue:any) => {
                      setCheckIn(newValue);
                      sessionStorage.setItem('checkIn',newValue);
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box sx={{alignItems:'center',display:'flex',width:'8rem',flexDirection:'column'}}>
                        <input ref={inputRef} {...inputProps} 
                        placeholder="Check In"/>
                        {InputProps?.endAdornment}
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div className='line'></div>

              <div className="search">
                    <img src={hotel} style={{height: '1.5rem'}}/>
                    <input onChange={(e)=>{
                            const d = data.filter(item=>(item.name.toLowerCase()).includes(e.target.value.toLowerCase()));
                            setSuggestions(d);
                            const n = data.indexOf(d[0])
                              if(n!=-1){
                                setN(n)
                              }
                            }} 
                           list="browse"
                           type="text" 
                           placeholder='Search hotel'/>
                    <datalist id="browse">
                        {suggestions.map((hotel,i)=>(<option key={i} value={hotel.name}/>))}
                    </datalist>
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