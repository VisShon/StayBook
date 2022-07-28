import React,{useState} from 'react'
import '../styles/BookingCard.scss'
import { useAppDispatch } from '../app/hooks';
import { removePlan } from '../app/planSlice';
import { addChild } from '../app/priceSlice';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const dropdown = {
  width: '4.5rem',
  marginLeft: '0.5rem'
};



function SelectedPlan({title}:any) {
  
  const [children, setChildren] = React.useState('0');
  const [adults, setAdults] = React.useState('0');

  const dispatch = useAppDispatch();

  const childChange = (event: SelectChangeEvent) => {
    setChildren(event.target.value as string);
    dispatch(addChild())
  };
  const adultsChange = (event: SelectChangeEvent) => {
    setAdults(event.target.value as string);
  };

  const onClickHandler = () =>{
    dispatch(removePlan(title));
  }

  return (
    <div className="selectedPlan">
      <div className="wrapper">
          <span style={{color: 'black'}}>{title}</span>
          <a onClick={onClickHandler} className="cancel">X</a>
      </div>

      <div className="wrapper">
          <div className="input">
            Adults
            <FormControl sx={{ m: 1, minWidth: 50,  }} size="small">
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