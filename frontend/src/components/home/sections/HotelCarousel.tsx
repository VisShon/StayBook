import React,{useEffect,useState} from 'react'
import '../../../styles/home/HotelCarousel.scss';
import {useAnimation,motion} from 'framer-motion';
import axios from 'axios';
import Hotels from '../../../data/fake.json'
import leftArrow from '../../../images/leftArrow.svg'
import rightArrow from '../../../images/rightArrow.svg'


const boxVariant = {
  visible: { opacity: 1, translateX: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, translateX: '10vw' }
};

function HotelCarousel() {

  const control = useAnimation();
  const [n,setN] = useState(0);
  const data = Object.values(Hotels);


  useEffect(() => {
      control.start("hidden");
      control.start("visible");
  }, [control, n]);


  // const [data,setData] =  useState<any[]>([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await axios.get(`http://localhost:8000/api/getAllData`).then((value) => {
  //       setData(Object.values(value.data));
  //     });
  //   }
  //   getData();
  // },[])

  return (
    <div className='body'>
      {/* <div className='body'>
        <div className='image'>
          <img src ={require('../../../images/'+(Object.values(data[n].images))[1])}/>
          <div className='image-background'></div>
        </div>


        <div className='content'>
          <h2>{data[n].name}</h2>
          <p>{data[n].description}</p>
          <a href={data[n].link} className='button'>Book Now</a>
        </div>
      </div> */}

      <motion.div className='hotelCarouselBody'
                  initial='hidden'
                  variants={boxVariant}
                  animate={control}>
        <div className='image'>
          <img src ={require('../../../images/'+(Object.values(data[n].images))[1])}/>
          <div className='image-background'></div>
        </div>


        <div className='content'>
          <h2>{data[n].name}</h2>
          <p>{data[n].description}</p>
          <a href={data[n].link} className='button'>Book Now</a>
        </div>
      </motion.div>

      <div className='arrows'>
        <img src={leftArrow} onClick={()=>{setN(prev=>prev==0?prev:--prev);
            n!==0?control.set('hidden'):control.set('visible');}}/>
        <img src={rightArrow} onClick={()=>{setN(prev=>prev==data.length-1?prev:++prev);
            n!==data.length-1?control.set('hidden'):control.set('visible');;}}/>
      </div>

      <div className='progress'>
        {data.map((item, index)=>
          (<div className='progress-segment'>
            <div className='outline' style={index!==n?{borderColor:'white'}:{borderColor:'#CF8F24'}}>
              <div className='circle'></div>
            </div>
           {index!==data.length-1&&<div className='line'></div>}
          </div>))}
      </div>
    </div>
  )
}

export default HotelCarousel