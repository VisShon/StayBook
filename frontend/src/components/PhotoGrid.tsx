import React, {useState , useRef} from 'react';
import '../styles/PhotoSlider.scss'


function PhotoGrid({data}:any) {
  return (
    <div className='photoGrid'>
        <img className="image" src={require("../images/"+data[0])}/>
        <div className='grid'>
            {data.slice(1 , 5).map((item:string, i:number) =>(
                <img className="image" src={require("../images/"+item)}/>
            ))}
        </div>
    </div>
  )
}

export default PhotoGrid