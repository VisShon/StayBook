import React,{useState,useEffect,useContext} from 'react'
import ProfileHistory from '../components/home/ProfileHistory';
import '../styles/home/Profile.scss';
import {AuthContext,AuthContextProps} from '../context/AuthContext'
import { useJwt } from "react-jwt";
import axios from "axios";

function Profile() {
  const {Login} = useContext<AuthContextProps>(AuthContext);
  const userToken = sessionStorage.getItem('user');
  const {decodedToken, isExpired }:any = useJwt(userToken!);
  const [history,setHistory] = useState<string[]>([])
  useEffect(() =>{
    const checkAuth = async () =>{
      if(!userToken){await Login()};
      const result = await axios.post('http://localhost:8000/api/getAllReservations',{email:sessionStorage.getItem('email')}).then((response) => setHistory(response.data))
    }
    checkAuth();
  },[])

  return (
    <>
      {!decodedToken&&<div>Reload again</div>}
      {decodedToken&&<div className="profileBody">
        <div className="userInfo">
          <img src={decodedToken.picture}/>
          <h2>{decodedToken.email}</h2>
          <p>{decodedToken.name}</p>
          {/* <div className="credits">Credits: 700</div> */}
        </div>

        <h2>Your Registrations</h2>

        <div className="historyContainer">
            {history.map((item,index)=>(
              <ProfileHistory hotel={item} key={index}/>
            ))}
        </div>
      </div>}
    </>
  )
}

export default Profile