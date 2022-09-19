import React from 'react';
import { useJwt } from "react-jwt";
import logo from "../../images/logo.png";
import '../../styles/NavBar.scss';
import  Dropdown  from './Dropdown'
import user from '../../images/user.svg'
import {Link} from 'react-router-dom'

function Navbar(){
  const userToken = sessionStorage.getItem('user');
  const {decodedToken, isExpired }:any = useJwt(userToken!);

return (

  <div className="navbar">
    <Link to="/" className="logo"><img src={logo} className="logo"/></Link>
    <div className="TourPackage">
      <Dropdown/>
      <Link to="/packages" className="item">Tour Packages</Link>
      <Link to="/blogs" className="item">Blogs</Link>
      <Link to="/contactus"className="item">Contact Us</Link>
    </div>
    <Link to="/profile" className="logo"><img src={decodedToken?decodedToken.picture:user} className="profilepic"/></Link>
  </div>

)


}

export default Navbar;