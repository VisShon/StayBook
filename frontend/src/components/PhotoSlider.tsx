import React, {useState , useEffect} from 'react';
import '../styles/PhotoSlider.scss'
import {FaArrowAltCircleRight , FaArrowAltCircleLeft} from 'react-icons/fa';
function PhotoSlider({data}:any) {

  const [current , setCurrent]  = useState(0);

  const showPrevItems = () => {


    setCurrent(current == 1 ?5 : (prevValue) => prevValue -1);
   }

   const showNextItems = () => {


    setCurrent(current == 6 ?1 : (prevValue) => prevValue +1);
   }


  return (
  

    <div className="photoSlider">
       <FaArrowAltCircleLeft onClick={showPrevItems}></FaArrowAltCircleLeft>
      <FaArrowAltCircleRight onClick={showNextItems}></FaArrowAltCircleRight>
      {data.slice(0 , current).map((item:any,index:number) => (
          <img className="image" src={require("../images/"+item)} key={index}/>
      ))}
     
    </div>
  )
}

export default PhotoSlider