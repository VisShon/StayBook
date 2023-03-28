import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";
import logo from "../../images/logo.png";
import "../../styles/NavBar.scss";
import Dropdown from "./Dropdown";
import user from "../../images/user.svg";
import { useScroll } from "framer-motion";

function Navbar() {
  const { scrollYProgress } = useScroll();
  const navbar = useRef<HTMLDivElement>(null);
  const hamburger = useRef<HTMLButtonElement>(null);
  const userToken = sessionStorage.getItem("user");
  const { decodedToken, isExpired }: any = useJwt(userToken!);
  const [isOpen, setIsOpen] = useState(false);
  var prevScrollpos = window.pageYOffset;
  const [windowSize, setWindowSize] = useState(0);
  
  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);


  useEffect(() => {
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
        if (prevScrollpos >= currentScrollPos) {
      
          navbar.current!.className = "navbar";
         
      } else {
          navbar.current!.className = "navbar-mini";
          
      }
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener('mousemove',()=>{
        navbar.current!.className='navbar';
    })
  }, []);

  const collapse = () => {
    if (hamburger.current!.classList.contains("is-active")) {
      hamburger.current!.classList.remove("is-active");
      setIsOpen(false);
    } else {
      hamburger.current!.classList.add("is-active");
      setIsOpen(true);
    }
  };

  return (
    <div className="navbar" ref={navbar}>
      <Link to="/" className="logo">
        <img src={logo} className="logo" alt={"StayBook Hotels"} />
      </Link>
      <div className="TourPackage">
        <Dropdown />
        <Link to="/packages" className="item noprint">
          Tour Packages
        </Link>
        <Link to="/blogs" className="item noprint">
          Blogs
        </Link>
        <Link to="/aboutus" className="item noprint">
          About Us
        </Link>
        <Link to="/contactus" className="item noprint">
          Contact Us
        </Link>
      </div>

      <Link to="/profile" className="logo noprint">
        <img
          src={decodedToken ? decodedToken.picture : user}
          className="profilepic"
          alt={"StayBook Hotels"}
        />
      </Link>

      {!(windowSize >= 768)&&
      <div className="navMobile noprint">
        <button
          className="hamburger hamburger--collapse"
          ref={hamburger}
          type="button"
          onClick={collapse}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>}

      {isOpen && !(windowSize >= 768)&& (
        <div className="navMobile-box">
          <Dropdown />
          <Link className="item" to="/packages" onClick={collapse}>
            Tour Packages
          </Link>
          <Link className="item" to="/blogs" onClick={collapse}>
            Blogs
          </Link>
          <Link className="item" to="/aboutus" onClick={collapse}>
            About Us
          </Link>
          <Link className="item" to="/contactus" onClick={collapse}>
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;