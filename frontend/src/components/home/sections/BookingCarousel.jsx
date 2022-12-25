import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useScroll, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import '../../../styles/home/BookingCarousel.scss'
import client from '../../../client'
import arrow from '../../../images/arrowVector.svg'
import guest from '../../../images/guests.svg'
import hotel from '../../../images/hotel.svg'
import dish from '../../../images/breakfast.png'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Box from '@mui/material/Box'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: .65 } },
    hidden: { opacity: 0, translateY: '3vw' },
}

function BookingCarousel() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [guests, setGuests] = useState(2)
    const [n, setN] = useState(0)
    const [suggestions, setSuggestions] = useState([])
    const control = useAnimation()
    const [ref, inView] = useInView()
    const nav = useNavigate()

    const { scrollY } = useScroll();
    const translateY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 1,

    });
    const translateY2 = useSpring(scrollY, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.01,
        
      });
    const[prog,setProg] = useState(translateY.current)
    translateY.onChange((current, value) => {setProg(current)})

    const onSubmit = () => {
        sessionStorage.setItem('guests', guests.toString())
        nav(`/${data[n].slug.current}`)
    }

    useEffect(() => {
        if (inView) {
            control.start('visible')
        } else {
            control.start('hidden')
        }
    }, [control, inView])

    useEffect(() => {
        const fetchedData = async () => {
            await client
                .fetch(
                    `*[_type == "hotel"] {
        name,
        slug,
        description,
        images[]{
          asset -> {url},
        }
      }`
                )
                .then((data) => setData(data))
                .then(() => {
                    control.start('visible')
                    setLoading(true)
                })
        }
        fetchedData()
    }, [])

    return (
        <div className="carouselBody" id="bookingBar">
            {loading && (
                <>
                    <div className="bookingBar">
                        <div onClick={onSubmit} className="arrowButton">
                            <img src={arrow} alt={'StayBook Hotels'} />
                            <p>Book Now</p>
                        </div>

                        <div className="line"></div>

                        <div className="guests">
                            <input
                                type="number"
                                value={guests}
                                min="2"
                                max="3"
                            />
                            <div className="change">
                                <div
                                    onClick={() => {
                                        guests == 2
                                            ? setGuests(2)
                                            : setGuests((prev) => --prev)
                                    }}
                                    className="changeValue"
                                    style={
                                        guests == 2
                                            ? { color: 'grey' }
                                            : { color: 'black' }
                                    }
                                >
                                    -
                                </div>
                                <img src={guest} style={{ height: '1.5rem' }}  alt={'StayBook Hotels'}/>
                                <div
                                    onClick={() => {
                                        guests === 4
                                            ? setGuests(4)
                                            : setGuests((prev) => ++prev)
                                    }}
                                    className="changeValue"
                                    style={
                                        guests == 4
                                            ? { color: 'grey' }
                                            : { color: 'black' }
                                    }
                                >
                                    +
                                </div>
                            </div>
                        </div>

                        <div className="line"></div>

                        <div className="input">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Check In"
                                    value={checkIn}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setCheckIn(newValue)
                                        sessionStorage.setItem(
                                            'checkIn',
                                            newValue
                                        )
                                    }}
                                    renderInput={({
                                        inputRef,
                                        inputProps,
                                        InputProps,
                                    }) => (
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                width: '8rem',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <input
                                                ref={inputRef}
                                                {...inputProps}
                                                placeholder="Check In"
                                            />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day', 'month']}
                                    label="Check Out"
                                    value={checkOut}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setCheckOut(newValue)
                                        sessionStorage.setItem(
                                            'checkOut',
                                            newValue
                                        )
                                    }}
                                    renderInput={({
                                        inputRef,
                                        inputProps,
                                        InputProps,
                                    }) => (
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                width: '8rem',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <input
                                                ref={inputRef}
                                                {...inputProps}
                                                placeholder="Check Out"
                                            />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="line"></div>

                        <div className="search">
                            <img src={hotel} style={{ height: '1.5rem' }} alt={'StayBook Hotels'} />
                            <input
                                onChange={(e) => {
                                    const d = data.filter((item) =>
                                        item.name
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            )
                                    )
                                    setSuggestions(d)
                                    const n = data.indexOf(d[0])
                                    if (n != -1) {
                                        setN(n)
                                    }
                                }}
                                list="browse"
                                type="text"
                                placeholder="Search hotels in Delhi"
                            />
                            <datalist id="browse">
                                {suggestions.map((hotel, i) => (
                                    <option key={i} value={hotel.name} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <ul>
                        <li>Homely Stay</li>
                        <li>Breakfast</li>
                        <li>Lunch</li>
                        <motion.li
                                ref={ref}
                                variants={boxVariant}
                                initial="hidden"
                                animate={control}>
                           Dinner & Party</motion.li>
                    </ul>
                    
                    <div className="dish">
                        <img style={{transform: 'rotateZ('+(translateY.current/20).toString()+'deg)'}} 
                            src ={dish} alt={'StayBook Hotels'}/>
                    </div>

                    <div className="bottle">
                        <img style={{transform:'translateY('+(translateY2.current/6).toString()+'px)'}} 
                        src ={'https://annajona.is/static/media/s1/3.png'} alt={'StayBook Hotels'}/>
                        <img style={{transform:'translateY('+(translateY2.current/6).toString()+'px)'}} 
                        src ={'https://annajona.is/static/media/s1/2.png'} alt={'StayBook Hotels'} className="shadow"/>
                    </div>

                </>
            )}
        </div>
    )
}

export default BookingCarousel
