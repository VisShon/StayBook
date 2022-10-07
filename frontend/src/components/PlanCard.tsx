import React,{useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../app/hooks'
import { addPlan,removePlan } from '../app/planSlice';
import '../styles/PlanCard.scss'

function PlanCard({plan,room,amenities}:any) {

  const Plans = useAppSelector(state => state.plans.selectedPlans);
  const dispatch = useAppDispatch();
  const n = sessionStorage.getItem('guests');

  useEffect(() => {
    if(n && plan.info.substring(0,1)==n) {
      if(Plans.length==0){
        let newPlan = {...plan , roomType: room}
        dispatch(addPlan(newPlan))
      }
    }
  },[Plans])

  

  const wind = window.matchMedia('(max-width: 800px)');

  const onClickHandler = () =>{
    let newPlan = {...plan , roomType: room}
    dispatch(addPlan(newPlan))
  }

  return (
    <div className="planCard">
      <div style={{width:'35%'}}>
        <h2>{plan.title}</h2>
        <p>{plan.info}</p>
      </div>
      {!wind.matches&&<div className="tooltip">Amenities
        <div className="tooltiptext">{amenities}</div>
      </div>}
      
      <h2>₹{plan.price}</h2>
      <div className="button" onClick={onClickHandler}>Add</div>
    </div>
  )
}

export default PlanCard