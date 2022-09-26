import React,{useState,useEffect} from 'react'
import '../../styles/home/Profile.scss'
import data from '../../data/hotelData.json'

function ProfileHistory({hotel}: any) {
  const hotelData = Object.values(data).filter(item => item.link == '/'+hotel)[0]
  return (
    <div className="history">
        <img src ={require('../../images/'+(Object.values(hotelData.images))[1])}/>
        <div className="historyInfo">
            <h2>{hotelData.name}</h2>
            <a href={hotelData.link} className='button'>Book Again</a>
        </div>
    </div>
  )
}

export default ProfileHistory