import React from 'react'
import Package from '../components/home/Package'
import '../styles/home/Package.scss'
import data from '../data/tourPackage.json'

function Packages() {
  return (
    <div className='packagePageBody'>
      {data.map((p,i)=>(
      <Package name={p.name} image={p.image} time={p.time}  description={p.description} highlight={p.highlight}/>
      ))}
    </div>
  )
}

export default Packages