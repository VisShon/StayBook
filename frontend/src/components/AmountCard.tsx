import React from 'react'
import '../styles/BookingCard.scss';

function AmountCard({}:any) {
  return (
    <div className="amountCard">
      <div className="input">
        <span>Room Price</span>
        <span>{}</span>
      </div> 
      <div className="input">
        <span>Tax</span>
        <span>{}</span>
      </div> 
      <div className="input">
        <span>Total Price</span>
        <span>{}</span>
      </div> 

    </div>
  )
}

export default AmountCard