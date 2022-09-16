import React,{ useEffect } from 'react'
import '../../../styles/home/BookingCarousel.scss'
import {motion,useAnimation} from 'framer-motion'
import { useInView } from "react-intersection-observer";


const boxVariant = {
  visible: { opacity: 1,transition: { duration: 0.5 } },
  hidden: { opacity: 0 }
};


function BookingCarousel() {

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  
  return (
      <motion.div className='carouselBody'
              ref={ref}
              variants={boxVariant}
              initial="hidden"
              animate={control}>
          <div className='bookingBar'>
              <div className='arrowButton'></div>
              <input type='dropdown'/>
              <input type='date'/>
              <input type='date'/>
          </div>
      </motion.div>
  )
}

export default BookingCarousel