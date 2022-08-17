import React from 'react'
import '../styles/BookingCard.scss';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { updatePrice } from '../app/priceSlice';

function AmountCard({checkIn, checkOut}:any) {

  const plans = useAppSelector(state => state.plans.selectedPlans);
  const children = useAppSelector(state => state.price.children);
  const dispatch = useAppDispatch();
  
  var roomPrice:number=0;
  plans.forEach((plan:any)=>{
      roomPrice+=parseInt(plan.price,10);
  });
  roomPrice+=children*500;
  if(checkIn&&checkOut){roomPrice*=Math.ceil(Math.abs(checkIn!.getTime() - checkOut!.getTime())/ (1000 * 60 * 60 * 24))}
  var tax:number= parseFloat((roomPrice*(10/100)).toFixed(3)); 
  var netPrice:number = roomPrice+tax;
  dispatch(updatePrice(netPrice))

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