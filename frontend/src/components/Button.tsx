import React,{useState,useContext} from 'react'
import '../styles/Button.scss'
import axios from 'axios';
import { useAppSelector } from '../app/hooks';
import emailjs from '@emailjs/browser' 
import {AuthContext,AuthContextProps} from '../context/AuthContext'

function Button({checkIn,checkOut}:any){
  let price = useAppSelector(state => state.price.value)
  let orderAmount = (price*10).toString()+'0'
  const {username,email,phone,Login} = useContext<AuthContextProps>(AuthContext);

  const[isLoading,setIsLoading] = useState(false);
  const[error,setError] = useState(false)
  const[isPaid,setIsPaid] = useState(false)

  const hotelName:string = new URL(window.location.href).pathname;
  const children = useAppSelector(state => state.price.children);
  const plans = useAppSelector(state => state.plans.selectedPlans);
  
  const onClickHandler = async () =>{   
    setIsLoading(true)
    if(!username){await Login()};
    const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
    };

    script.onload = async () => {
      try {
        const result = await axios.post(`/create-order`, {
          amount: orderAmount,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('/get-razorpay-key');
        
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          handler: async function(response:any){
            
            let templateParams = {
              to_name:sessionStorage.getItem('email'),
            }
            const mail = await emailjs.send('service_pz9e3th','template_i78ka1b',templateParams,'bE7FBsdP5YFb4U6LK')
            .then(function(response) {
            }, function(error) {
              console.log(error)
            });

            if(!username){
              setError(true);
            }
            setIsPaid(true)
            
            const result = await axios.post(`/api${hotelName}/setReservations`,{
              username:username ,
              email:email, 
              checkIn: checkIn,
              checkOut: checkOut,
              amountPaid: price,
              selectedPlans:plans,
            },{headers:{Authorization: `bearer ${sessionStorage['user']}`}})
          },
          description: 'Hotel Booking',
          order_id: order_id,
          prefill: {
            name: 'Mohit Khanna',
            email: 'staybookhost@gmail.com',
            contact: '8527703312',
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
    setIsLoading(false)
  }

  return (
    <>
      <div className={error?("Button-error"):("Button")} onClick={onClickHandler}>{error?"Error Refresh and Try Again":"Proceed to checkout!"}
      </div>
      {isLoading&&<div className="Button-Loading">Loading...</div>}
      {isPaid&&<div className="Button-Loading">Booking Done</div>}
    </>
  )
}

export default Button