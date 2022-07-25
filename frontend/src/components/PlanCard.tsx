import React from 'react'
import '../styles/PlanCard.scss'

function PlanCard({plan}:any) {
  return (
    <div className="planCard">
      <div style={{width:'30%'}}>
        <h2>{plan.title}</h2>
        <p>{plan.info}</p>
      </div>
      <p>Cancellation Policies</p>
      <h2>₹{plan.price}</h2>
      <div className="button">Add</div>
    </div>
  )
}

export default PlanCard