import React from 'react'
import '../styles/BookingCard.scss'
import { Picklist,Option } from 'react-rainbow-components';
const dropdown = {
  width: '4rem',
  marginLeft: '0.5rem'
};


function SelectedPlan({selectedRooms,setSelectedRooms}:any) {
  return (
    <div className="selectedPlan">
      <div className="wrapper">
          <span style={{color: 'black'}}>Name</span>
          <a className="cancel">X</a>
      </div>

      <div className="wrapper">
          <div className="input">
            Adults
            <Picklist style={dropdown}>
                    <Option name="option 1" label="1" />
                    <Option name="option 2" label="2" />
            </Picklist>
          </div>
          <div className="input">
            Child
            <Picklist style={dropdown}>
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