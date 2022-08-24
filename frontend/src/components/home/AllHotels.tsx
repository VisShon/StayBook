import React,{useState,useEffect} from 'react'
import '../../styles/home/AllHotels.scss'
import axios from 'axios'

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
          <div className = "hotelName">{item.name}</div>
          <img src ={require('../../images/'+item.images[0])} className = "AiraXingImage"></img>
          <div className = "row">Airport pick-up/drop-off, room service, and complimentary Wi-Fi are all available at Hotel Aira Xing. The budget hotel Aira Xing is a 10-minute drive from the New Delhi Railway Station and the Jhandewalan Metro Station</div>
          <button className="glow-on-hover" type="button">Book Now</button>
        </div>
      ))}
    </div>


   
  )
}

export default AllHotels