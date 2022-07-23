import React from 'react'
import '../styles/PhotoSlider.scss'

function PhotoSlider({data}:any) {
  return (
    <div className="photoSlider">
      {data.map((item:any,index:number) => (
          <img className="image" src={require("../images/"+item)} key={index}/>
      ))}
    </div>
  )
}

export default PhotoSlider