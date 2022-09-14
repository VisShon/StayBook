import React from 'react';

import logo from "../../images/logo.png";
import '../../styles/NavBar.scss';
import  Dropdown  from './Dropdown'
import user from '../../images/user.svg'

function Navbar(){

return (

  <div className="navbar">
    <a href="/" className="logo"><img src={logo} className="logo"/></a>
    <div className="TourPackage">
      <Dropdown/>
      <p className="item">Tour Packages</p>
      <p className="item">Blogs</p>
      <p className="item">Contacts</p>
    </div>
    <img src={user} className="logo"/>
  </div>

)


}

export default Navbar;