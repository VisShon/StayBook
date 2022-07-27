import React from 'react'
import '../styles/BookingCard.scss';

function AmountCard({selectedPlans,setNetPrice,netPrice}:any) {
  var roomPrice:number=0;
  selectedPlans.forEach((plan:any)=>{
      roomPrice+=parseInt(plan.price,10);
  })
  console.log(selectedPlans)
  var tax:number= roomPrice*(10/100); 
  // setNetPrice(roomPrice+tax)

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