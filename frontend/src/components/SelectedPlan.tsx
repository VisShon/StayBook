import React,{useState,useEffect} from 'react'
import '../styles/BookingCard.scss'
import { useAppDispatch } from '../app/hooks';
import { removePlan } from '../app/planSlice';
import { numberOfChildren } from '../app/priceSlice';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

const dropdown = {
  width: '4.5rem',
  marginLeft: '0.5rem'
};



function SelectedPlan({title,roomType,checkIn,checkOut}:any) {
  

  const [isRoomAvailable,setIsRoomAvailable] = useState(true)
  const [children, setChildren] = useState('0');
  const [adults, setAdults] = useState('0');

  useEffect(()=>{
    const checkAvailability = async() => {
      const result = await axios.post(`http://localhost:8000/`)
      
    }
    checkAvailability();
  },[])


  const dispatch = useAppDispatch();

  const childChange = (event: SelectChangeEvent) => {
    setChildren(event.target.value as string);
    dispatch(numberOfChildren(event.target.value as string))
  };
  const adultsChange = (event: SelectChangeEvent) => {
    setAdults(event.target.value as string);
  };

  const onClickHandler = () =>{
    dispatch(removePlan(title));
    dispatch(numberOfChildren('0'))
  }

  return (
    <div className={isRoomAvailable ? 'selectedPlan':'selectedPlan-unavailable'}>
      <div className="wrapper">
          <span style={{color: 'black'}}>{roomType}({title})</span>
          {!isRoomAvailable&&<h3 style={{color: 'red',margin:'1px'}}>Unavailable</h3>}
          <a onClick={onClickHandler} className="cancel">X</a>
      </div>

      <div className="wrapper">
          <div className="input">
            Adults
            <FormControl sx={{ m: 1, minWidth: 50  }} size="small">
                <Select
                  value={adults}
                  onChange={adultsChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className="input">
            Child
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
              <Select
                value={children}
                onChange={childChange}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            Room 1
          </div>
      </div>
      
    </div>
  )
}

export default SelectedPlan