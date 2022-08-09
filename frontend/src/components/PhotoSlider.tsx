import React, {useState , useRef} from 'react';
import '../styles/PhotoSlider.scss'
import left from '../images/left.png'
import right from '../images/right.png'

function PhotoSlider({data}:any) {
  const ref = useRef<HTMLDivElement>(document.createElement("div"));
  const scrollRight = () => {
    ref.current.scrollBy({left: 750, behavior: 'smooth'});
  };
  const scrollLeft = () => {
    ref.current.scrollBy({left: -750, behavior: 'smooth'});
  };

  return (
      <div ref={ref} className="photoSlider" >
        {data.map((item:any,index:number) => (
            <img className="image" src={require("../images/"+item)} key={index}/>
        ))}
        <a onClick={scrollLeft} className="leftIcon"><img style={{width:'5rem'}} src={left}/></a>
        <a onClick={scrollRight} className="rightIcon"><img style={{width:'5rem'}} src={right}/></a>
      </div>
  )
}

export default PhotoSlider