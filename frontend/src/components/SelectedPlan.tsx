import React,{useState} from 'react'
import '../styles/BookingCard.scss'
import { Picklist,Option } from 'react-rainbow-components';
import { useAppDispatch } from '../app/hooks';
import { removePlan } from '../app/planSlice';
const dropdown = {
  width: '4.5rem',
  marginLeft: '0.5rem'
};


function SelectedPlan({title}:any) {
  
  const dispatch = useAppDispatch();
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
            <Picklist style={dropdown} placeholder="1">
                    <Option name="option 1" label="1" />
                    <Option name="option 2" label="2" />
            </Picklist>
          </div>
          <div className="input">
            Child
            <Picklist style={dropdown} placeholder="0">
                    <Option name="option 1" label="0" />
                    <Option name="option 2" label="1" />
            </Picklist>
          </div>
          <div>
            Room 1
          </div>
      </div>
    </div>
  )
}

export default SelectedPlan