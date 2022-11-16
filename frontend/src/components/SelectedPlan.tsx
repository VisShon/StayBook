import React, { useState, useEffect } from 'react'
import '../styles/BookingCard.scss'
import { useAppDispatch } from '../app/hooks'
import { removePlan } from '../app/planSlice'
import { numberOfChildren } from '../app/priceSlice'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios'

const dropdown = {
    width: '4.5rem',
    marginLeft: '0.5rem',
}

function SelectedPlan({ maxCap, title, roomType, checkIn, checkOut }: any) {
    // const hotelName: string = new URL(window.location.href).pathname

    const [isRoomAvailable, setIsRoomAvailable] = useState(true)
    const [children, setChildren] = useState('0')

    // useEffect(() => {
    //     const checkAvailability = async () => {
    //         const re2 = await axios
    //             .post(`/api${hotelName}/isRoomAvailable`, {
    //                 checkIn: checkIn,
    //                 checkOut: checkOut,
    //                 roomType: roomType,
    //                 maxCap: maxCap,
    //                 // maxCap:0,
    //             })
    //             .then((res) => setIsRoomAvailable(res.data))
    //     }
    //     checkAvailability()
    // }, [])

    const dispatch = useAppDispatch()

    const childChange = (event: SelectChangeEvent) => {
        setChildren(event.target.value as string)
        dispatch(numberOfChildren(event.target.value as string))
    }

    const onClickHandler = () => {
        sessionStorage.removeItem('guests')
        dispatch(removePlan({ title: title, roomType: roomType }))
        dispatch(numberOfChildren('0'))
    }

    return (
        <div
            className={
                isRoomAvailable ? 'selectedPlan' : 'selectedPlan-unavailable'
            }
        >
            <div className="wrapper">
                <span style={{ color: 'black', textAlign: 'left' }}>
                    {roomType}({title})
                </span>
                {!isRoomAvailable && (
                    <h3 style={{ color: 'red', margin: '1px' }}>Unavailable</h3>
                )}
                <a onClick={onClickHandler} className="cancel">
                    X
                </a>
            </div>

            <div className="wrapper">
                <div className="input">
                    Child
                    <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
                        <Select value={children} onChange={childChange}>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>Room 1</div>
            </div>
        </div>
    )
}

export default SelectedPlan
