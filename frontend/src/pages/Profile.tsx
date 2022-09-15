import React from 'react'
import ProfileHistory from '../components/home/ProfileHistory';
import '../styles/home/Profile.scss';
function Profile() {
  return (
    <div className="profileBody">
      <div className="userInfo">
        <img/>
        <h2>Vishnu Shon</h2>
        <p>vshon447@gmail.com</p>
        <div className="credits">Credits: 700</div>
      </div>

      <h2>History with Us</h2>

      <div className="historyContainer">
          <ProfileHistory/>
      </div>
    </div>
  )
}

export default Profile