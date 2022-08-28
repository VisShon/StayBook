import React, {useState , useRef} from 'react';
import '../styles/PhotoSlider.scss'
import left from '../images/left.png'
import right from '../images/right.png'

function PhotoSlider({data}:any) {

  const wind = window.matchMedia('(max-width: 800px)');

  const ref = useRef<HTMLDivElement>(document.createElement("div"));
  const scrollRight = () => {
    !wind.matches?
    ref.current.scrollBy({left: 1000, behavior: 'smooth'}):
    ref.current.scrollBy({left: 555, behavior: 'smooth'});
  };
  const scrollLeft = () => {
    !wind.matches?
    ref.current.scrollBy({left: -1000, behavior: 'smooth'}):
    ref.current.scrollBy({left: -555, behavior: 'smooth'});
  };

  return (
      <div ref={ref} className="photoSlider" >
        {data.map((item:any,index:number) => (
            <img className="image" src={require("../images/"+item)} key={index}/>
        ))}
        <a onClick={scrollLeft} className="leftIcon"><img style={!wind.matches?{width:'5rem'}:{width:'3rem'}} src={left}/></a>
        <a onClick={scrollRight} className="rightIcon"><img style={!wind.matches?{width:'5rem'}:{width:'3rem'}}src={right}/></a>
      </div>
  )
}

export default PhotoSlider