import React, { useState,useEffect,useContext } from 'react'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import emailjs from '@emailjs/browser'
import Button from './Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'

import { useAppSelector } from '../app/hooks'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import { useAppDispatch } from '../app/hooks'
import { removePlan } from '../app/planSlice'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function BookingCard({hotelName, address, slideRef}:any) {

    const ref: string = new URL(window.location.href).pathname

    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const CheckOutDate = sessionStorage.getItem('checkOut')
    const CheckInDate = sessionStorage.getItem('checkIn')

    const [checkIn, setCheckIn] = useState<Date | null>(
        CheckInDate ? new Date(CheckInDate) : today
    )
    const [checkOut, setCheckOut] = useState<Date | null>(
        CheckOutDate ? new Date(CheckOutDate) : tomorrow
    )

    const dispatch = useAppDispatch()
    const withoutTax = useAppSelector((state) => state.price.withoutTax)
    const price = useAppSelector((state) => state.price.value)
    const Plans = useAppSelector((state) => state.plans.selectedPlans)

    const [contact,setContact] = useState<string>("");
    const [payAtHotel,setPayAtHote] = useState<boolean>(false);
    const [isPaid,setIsPaid] = useState<boolean>(false);
    const [noSelected,setNoSelected] = useState<boolean>(false);
    const [noContact,setNoContact] = useState<boolean>(false);
    
    const { username, email, phone, Login } = useContext<AuthContextProps>(AuthContext)


    const payOnHotel = async () => {
        if (!username) {
            await Login()
        }
        if(!contact){
            setNoContact(true)
            setTimeout(()=>{setNoContact(false)},2000)
            return;
        }
        if(Plans.length==0){
            setNoSelected(true)
            setTimeout(()=>{setNoSelected(false)},2000)
            return;
        };
        let guests = 0;
        Plans.forEach((plan) => {guests+=plan.guests});

        const {
            data: { key: bearer },
        } = await axios.get('/get-bearer')

        let templateParams = {
            to_name: sessionStorage.getItem('email'),
            hotelName: hotelName,
            checkIn: checkIn!.toLocaleDateString() + ' 12:00 PM Onwards',
            checkOut: checkOut!.toLocaleDateString() + ' Till 11:00 AM',
            roomNumbers: Plans.length.toString(),
            guests: guests.toString(),
            hotelContact: "+918373929299",
            address: address,
            status:`Amount due ₹${price}, Pay now to save extra ₹190-`
        }
        await axios.post('https://graph.facebook.com/v14.0/113549444945607/messages/',
        { "messaging_product": "whatsapp", 
        "to": contact, 
        "type": "template", 
        "template": { 
            "name": "hotelorder",
            "language": { "code": "en_GB" }, 
            "components": [
                {
                  "type": "body",
                  "parameters": [
                    {
                      "type": "text",
                      "text": templateParams.hotelName
                    },
                    {
                      "type": "text",
                      "text": templateParams.checkIn
                    },
                    {
                      "type": "text",
                      "text": templateParams.checkOut
                    },
                    {
                      "type": "text",
                      "text": templateParams.roomNumbers
                    },
                    {
                      "type": "text",
                      "text": templateParams.guests
                    },
                    {
                      "type": "text",
                      "text": templateParams.hotelContact
                    },
                    {
                      "type": "text",
                      "text": templateParams.address
                    },
                    {
                      "type": "text",
                      "text": templateParams.status
                    },
                    ]
                }
            ]
        } },
        {headers:{"Content-Type":'application/json',
                  "Authorization":`Bearer ${bearer}`
        }})

        // try{
        //     await emailjs.send(
        //                     'service_pz9e3th',
        //                     'template_i78ka1b',
        //                     templateParams,
        //                     'bE7FBsdP5YFb4U6LK'
        //                     ).then(()=>setIsPaid(true))
        // }
        // catch(error){
        //     console.log(error);
        // }
        setIsPaid(true)
        try{
            await axios.post(
                `/api${ref}/setReservations`,
                {
                    username: username,
                    email: email,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    amountPaid: price.toString() + '(To be Paid)',
                    selectedPlans: Plans,
                },
                {
                    headers: {
                        Authorization: `bearer ${sessionStorage['user']}`,
                    },
                }
            );
        }
        catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        dispatch(
            removePlan({ title: 'Monthly Rate', roomType: 'Deluxe Suite' })
        )
    }, [])

    return (
        <div className="bookingCard" ref={slideRef}>
            <h1>₹{withoutTax}</h1>
            <div className="calendar">
                <div className="input">
                    <div style={{ marginRight: '0.5rem' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Check In"
                                value={checkIn}
                                minDate={new Date()}
                                onChange={(newValue: any) => {
                                    setCheckIn(newValue)
                                }}
                                renderInput={(params: any) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day', 'month']}
                                label="Check Out"
                                value={checkOut}
                                minDate={new Date()}
                                onChange={(newValue: any) => {
                                    setCheckOut(newValue)
                                }}
                                renderInput={(params: any) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
            <p>{Plans.length} rooms</p>

            <div className="selectedPlans">
                {Plans.map((item, index) => (
                    <SelectedPlan
                        maxCap={item.maxCap}
                        roomType={item.roomType}
                        title={item.title}
                        checkOut={checkOut}
                        checkIn={checkIn}
                        key={index}
                    />
                ))}
            </div>

            <AmountCard checkOut={checkOut} checkIn={checkIn} />

            <input type='checkbox' 
                   name='input' 
                   style={{marginTop: '10px'}}
                   onChange={()=>setPayAtHote(prev=>!prev)}/>
            <label> Pay at hotel </label>

            
            {noSelected&&<div className="unselected">Please select a plan to continue</div>}
            {noContact&&<div className="unselected">Please enter contact details</div>}
                <div className="payAtHotel">
                    {!isPaid?(payAtHotel&&<>
                        <input type='text' 
                           value={contact} 
                           onChange={(e)=>setContact(e.target.value)} 
                           className='phone' 
                           placeholder='Phone number (eg: 917017495876)'/>
                         <div onClick={payOnHotel} className='button'>Continue</div>
                    </>):
                    (<div className="Button-Loading">Booking Done</div>)}
                </div>

            {!payAtHotel&&<Button checkOut={checkOut} checkIn={checkIn} hotel={hotelName} address={address}/>}
        </div>
    )
}

export default BookingCard
