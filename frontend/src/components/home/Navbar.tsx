import React from 'react';

import logo from "../../images/logo.png";
import '../../styles/NavBar.scss';
import  Dropdown  from './Dropdown'


function Navbar(){

return (

  <div className="navbar">
    <img src={logo} className="logo"/>

    <div className="TourPackage">
      <p className="item">Tour Packages</p>
      <p className="item">Membership Program</p>
      <p className="item">Blogs</p>
      <p className="item">Contacts</p>
      <p className="item">My Account</p>
      <Dropdown/>
    </div>

    <a href='/jyotimahal' className = "Book">Book</a>
  </div>

)


}

export default Navbar;