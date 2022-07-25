import React from 'react'
import '../styles/BookingCard.scss'
function SelectedPlan({}:any) {
  return (
    <div className="selectedPlan">
      <div className="wrapper">
          <span>Name</span>
          <a>button</a>
      </div>

      <div className="wrapper">
          <div>
            Adults
          </div>
          <div>
            Child
          </div>
          <div>
            Room 1
          </div>
      </div>
    </div>
  )
}

export default SelectedPlan