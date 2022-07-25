import React from 'react'
import '../styles/BookingCard.scss';

function AmountCard({}:any) {
  return (
    <div className="amountCard">
      <div className="wrapper">
        <span>Room Price</span>
        <span>{}</span>
      </div> 
      <div className="wrapper">
        <span>Tax</span>
        <span>{}</span>
      </div> 
      <div className="wrapper">
        <span>Total Price</span>
        <span>{}</span>
      </div> 

    </div>
  )
}

export default AmountCard