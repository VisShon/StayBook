import React,{useState,useEffect} from 'react'
import '../../styles/home/AllHotels.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'

function AllHotels() {

  const [hotel,setHotel] = useState<any>([]) 

  useEffect(() => {
    const getHotelData = async () => {
      const result = await axios.get(`http://localhost:8000/api/getAllData`).then(value => setHotel(value.data));
    }
    getHotelData();
  },[])

  return (
    <div className = "main">
      {Object.values(hotel).map((item:any, index:number) => (
        <div className = "hotel" key={index}>
          <h2 className = "hotelName">{item.name}</h2>
          <img src ={require('../../images/'+item.images[0])} className = "AiraXingImage"></img>
          <p className = "descp">{item.description}</p>
          <Link to={`${item.link}`} className="glow-on-hover">Book Now</Link>
        </div>
      ))}
    </div>
  )
}

export default AllHotels