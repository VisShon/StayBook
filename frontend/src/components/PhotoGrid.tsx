import React, {useState , useRef} from 'react';
import '../styles/PhotoSlider.scss'


function PhotoGrid({data}:any) {
  return (
    <div className='photoGrid'>
        <img className="image" src={data[0].asset.url}/>
        <div className='grid'>
            {data.slice(1 , 5).map((item:any, i:number) =>(
                <img className="image" src={item.asset.url}/>
            ))}
        </div>
    </div>
  )
}

export default PhotoGrid