import React,{useState} from 'react'
import '../styles/Button.scss'
import axios from 'axios';
import { useAppSelector } from '../app/hooks';
import {Login} from '../app/firebase'

function Button({checkIn,checkOut}:any){

  const hotelName:string = new URL(window.location.href).pathname;
  let price = useAppSelector(state => state.price.value)
  let orderAmount = (price*10).toString()+'0'
  
  const plans = useAppSelector(state => state.plans.selectedPlans);
  const children = useAppSelector(state => state.price.children);


  const onClickHandler = async () =>{
    console.log('logging in')
    
    !localStorage.getItem('email')&&(await Login())

    console.log('login done')
    
    const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
    };

    script.onload = async () => {
      try {
        const result = await axios.post(`http://localhost:8000/create-order`, {
          amount: orderAmount,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('http://localhost:8000/get-razorpay-key');
        
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          handler: async function(response:any){
            const result = await axios.post(`http://localhost:8000/api${hotelName}/setReservations`,{
              username: localStorage.getItem('name'),
              email: localStorage.getItem('email'),
              checkIn: checkIn,
              checkOut: checkOut,
              amountPaid: price,
              selectedPlans:plans,
            })
            console.log(result)
          },
          description: 'example transaction',
          order_id: order_id,
          prefill: {
            name: 'StayBook',
            email: 'vshon447@gmail.com',
            contact: '7017495876',
          },
          notes: {
            address: 'StayBook',
          },
          theme: {
            color: '#CF8F24',
          },
        };
        
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <div className="Button" onClick={onClickHandler}>Proceed to chekout!</div>
  )
}

export default Button