import React from 'react'
import '../styles/PlanCard.scss'

function PlanCard({plan,setSelectedPlans}:any) {

  const addPlan = () =>{
    setSelectedPlans((prevValue:any)=> {prevValue.push(plan)
    })
    
    
  }

  return (
    <div className="planCard">
      <div style={{width:'30%'}}>
        <h2>{plan.title}</h2>
        <p>{plan.info}</p>
      </div>
      <p>Cancellation Policies</p>
      <h2>₹{plan.price}</h2>
      <div className="button" onClick={addPlan}>Add</div>
    </div>
  )
}

export default PlanCard