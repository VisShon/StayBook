import React from 'react'
import '../styles/BookingCard.scss';

function AmountCard({}:any) {
  return (
    <div className="amountCard">
      <div className="wrapper">
        <span>Room Price</span>
        <span>{0}</span>
      </div> 
      <div className="wrapper">
        <span>Tax</span>
        <span>{0}</span>
      </div> 
      <div className="wrapper">
        <span>Total Price</span>
        <span>{0}</span>
      </div> 

    </div>
  )
}

export default AmountCard