import React from 'react'
import '../styles/Button.scss'
import axios from 'axios';
import { useAppSelector } from '../app/hooks';

function Button() {

  var price = useAppSelector(state => state.price.value)
  var orderAmount = (price*10).toString()+'0'
  const loadRazorPay = () =>{
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
        console.log('poop')
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('http://localhost:8000/get-razorpay-key');
        
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
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
    <div className="Button" onClick={loadRazorPay}>Porceed to chekout!</div>
  )
}

export default Button