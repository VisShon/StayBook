import React from 'react'
import '../../../styles/home/BookingCarousel.scss'

function BookingCarousel() {
  return (
    <>
        <div className='carouselBody'>
            <div className='bookingBar'>
                <div className='arrowButton'></div>
                <input type='dropdown'/>
                <input type='date'/>
                <input type='date'/>
            </div>
        </div>
    </>
  )
}

export default BookingCarousel