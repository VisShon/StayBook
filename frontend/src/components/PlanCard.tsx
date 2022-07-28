import React from 'react'
import '../styles/PlanCard.scss'
import { useAppDispatch } from '../app/hooks'
import { addPlan } from '../app/planSlice';
function PlanCard({plan}:any) {

  const dispatch = useAppDispatch();
  const onClickHandler = () =>{
    dispatch(addPlan(plan))
  }

  return (
    <div className="planCard">
      <div style={{width:'30%'}}>
        <h2>{plan.title}</h2>
        <p>{plan.info}</p>
      </div>
      <p>Cancellation Policies</p>
      <h2>₹{plan.price}</h2>
      <div className="button" onClick={onClickHandler}>Add</div>
    </div>
  )
}

export default PlanCard