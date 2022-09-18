import React,{ useEffect,useState } from 'react'
import '../../../styles/home/BookingCarousel.scss'
import {motion,useAnimation} from 'framer-motion'
import Hotels from '../../../data/fake.json'
import leftArrow from '../../../images/leftArrow2.svg'
import rightArrow from '../../../images/rightArrow2.svg'
import arrow from '../../../images/arrowVector.svg'


const boxVariant = {
  visible: { opacity: 1, translateX: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, translateX: '10vw' }
};

function BookingCarousel() {

  const control = useAnimation();
  const [n,setN] = useState(0);
  const data = Object.values(Hotels);

  
  useEffect(() => {
    control.start("hidden");
    control.start("visible");
}, [control, n]);

  
  return (
      <div className='carouselBody'>

          <motion.div
            className='imageCard'
            initial='hidden'
            variants={boxVariant}
            animate={control}>
            <img src={require('../../../images/'+(Object.values(data[n].images))[4])}/>
          </motion.div>

          <h1>{data[n].name}</h1>
          <h2>Book Your Stay</h2>

          <div className='bookingBar'>
              <a href={data[n].link} className='arrowButton'>
                <img src={arrow}/>
              </a>
          </div>


          <div className='carouselArrows'>
            <img src={leftArrow} onClick={()=>{setN(prev=>prev==0?prev:--prev);
                n!==0?control.set('hidden'):control.set('visible');}}/>
            <img src={rightArrow} onClick={()=>{setN(prev=>prev==data.length-1?prev:++prev);
                n!==data.length-1?control.set('hidden'):control.set('visible');;}}/>
          </div>
      </div>
  )
}

export default BookingCarousel