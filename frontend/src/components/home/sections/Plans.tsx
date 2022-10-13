import React,{useEffect,useRef} from 'react';
import plans from '../../../images/plan.svg'
import '../../../styles/home/Plans.scss';
import {motion,useAnimation} from 'framer-motion'
import { useInView } from "react-intersection-observer";

const boxVariant = {
  visible: { opacity: 1, translateY: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, translateY: '5vw' }
};

function Plans() {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [observer,observerInView] =useInView();


  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
    let animationObject =  document.getElementById("image");
    if(observerInView) animationObject!.className='bgImageFull'
    else animationObject!.className='bgImageNew';

  }, [control,inView,observerInView]);
  
  return (
    <div className="container" >
      <img src={plans} id='image'/>
      <div ref={observer} className='observer'></div>
      <div className="plansBody">
        <div>
          <motion.div initial='hidden'
                ref={ref}
                variants={boxVariant}
                animate={control}>STAYBOOK</motion.div>
          <img src={plans} />
        </div>
        <div>
          <img src={plans}/>
          <motion.div initial='hidden'
                variants={boxVariant}
                animate={control}>FIND</motion.div>
        </div>
          <motion.div initial='hidden'
                variants={boxVariant}
                animate={control}>UNFORGETTABLE EXPERIENCES</motion.div>
      </div>
    </div>
  )
}

export default Plans