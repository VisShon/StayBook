import React, { useState,useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { removePlan } from '../app/planSlice'
import '../styles/BookingCard.scss'
import AmountCard from './AmountCard'
import SelectedPlan from './SelectedPlan'
import emailjs from '@emailjs/browser'
import { useAppSelector } from '../app/hooks'

import Button from './Button'

import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function BookingCard({hotelName, address}:any) {
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
    const Plans = useAppSelector((state) => state.plans.selectedPlans)

    const [payAtHotel,setPayAtHote] = useState<boolean>(false);
    const [contact,setContact] = useState<string|undefined>();

    const payOnHotel = async () => {

        let guests = 0;
        Plans.forEach((plan) => {guests+=plan.guests});
        let templateParams = {
            to_name: sessionStorage.getItem('email'),
            hotelName: hotelName,
            checkIn: checkIn!.toString(),
            checkOut: checkOut!.toString(),
            roomNumbers: Plans.length.toString(),
            guests: guests.toString(),
            hotelContact: "+918373929299",
            address: address,
        }
        const mail = await emailjs
                            .send(
                                'service_pz9e3th',
                                'template_i78ka1b',
                                templateParams,
                                'bE7FBsdP5YFb4U6LK'
                            )
    }

    useEffect(() => {
        dispatch(
            removePlan({ title: 'Monthly Rate', roomType: 'Deluxe Suite' })
        )
    }, [])

    return (
        <div className="bookingCard">
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

            {/* <input type='checkbox' 
                   name='input' 
                   style={{marginTop: '10px'}}
                   onChange={()=>setPayAtHote(prev=>!prev)}/>
            <label> Pay at hotel </label> */}

            {/* {payAtHotel&&<>
                <div className="payAtHotel">
                    <input type='text' 
                           value={contact} 
                           onChange={(e)=>setContact(e.target.value)} 
                           className='phone' 
                           placeholder='Phone number'/>
                    <div className='button'>Continue</div>
                </div>
            </>} */}

            
            {!payAtHotel&&<Button checkOut={checkOut} checkIn={checkIn} hotel={hotelName} address={address}/>}
        </div>
    )
}

export default BookingCard