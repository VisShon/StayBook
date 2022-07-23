import React from 'react';
import '../styles/Amneties.scss';

function Ameneties({data}:any) {
  return (
    <div className="details">Amenities:

      {data.map((item:any,index:number) => (
        <li className="amenities" key={index}>{item}</li>
      ))}
    
    </div>
  )
}

export default Ameneties