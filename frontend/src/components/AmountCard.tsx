import React from 'react'
import '../styles/BookingCard.scss';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updatePrice } from '../app/priceSlice';

function AmountCard() {

  const plans = useAppSelector(state => state.plans.selectedPlans)
  const dispatch = useAppDispatch();

  var roomPrice:number=0;
  plans.forEach((plan:any)=>{
      roomPrice+=parseInt(plan.price,10);
  })
  var tax:number= roomPrice*(10/100); 
  var netPrice:number = roomPrice+tax;
  dispatch(updatePrice({payload:netPrice}))

  return (
    <div className="amountCard">
      <div className="wrapper">
        <span>Room Price</span>
        <span>₹{roomPrice}</span>
      </div> 
      <div className="wrapper">
        <span>Tax</span>
        <span>₹{tax}</span>
      </div> 
      <div className="wrapper">
        <span>Total Price</span>
        <span>₹{netPrice}</span>
      </div> 

    </div>
  )
}

export default AmountCard