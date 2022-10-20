import React, {useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import logo from '../../images/logo.png';
import '../../styles/NavBar.scss';
import Dropdown from './Dropdown';
import user from '../../images/user.svg';
import { useScroll } from 'framer-motion';

function Navbar() {

    const {scrollYProgress} = useScroll()
    const navbar = useRef<HTMLDivElement>(null)
    const hamburger = useRef<HTMLButtonElement>(null)
    const userToken = sessionStorage.getItem('user');
    const { decodedToken, isExpired }: any = useJwt(userToken!);
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() => {
        scrollYProgress.onChange((latest) => {
            if(latest<scrollYProgress.getPrevious()){
                navbar.current!.className='navbar';
            }
            else{
                navbar.current!.className='navbar-mini';
            };
        })
    },[])

    const collapse = () => {
        if(hamburger.current!.classList.contains('is-active')){
            hamburger.current!.classList.remove('is-active')
            setIsOpen(false)
        }
        else{
            hamburger.current!.classList.add('is-active')
            setIsOpen(true)
        }
    }


    return (
        <div className="navbar" ref={navbar}>
            <Link to="/" className="logo">
                <img src={logo} className="logo" />
            </Link>
            <div className="TourPackage">
                <Dropdown />
                <Link to="/packages" className="item">
                    Tour Packages
                </Link>
                <Link to="/blogs" className="item">
                    Blogs
                </Link>
                <Link to="/contactus" className="item">
                    Contact Us
                </Link>
            </div>
            

            <Link to="/profile" className="logo">
                <img
                    src={decodedToken ? decodedToken.picture : user}
                    className="profilepic"
                />
            </Link>

            <div className="navMobile">
                <button className="hamburger hamburger--collapse" 
                        ref={hamburger}
                        type="button" 
                        onClick={collapse}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>

            {isOpen&&<div className="navMobile-box">
                <Link className='item' to="/packages">
                    Tour Packages
                </Link>
                <Link className='item' to="/blogs">
                    Blogs
                </Link>
                <Link className='item' to="/contactus">
                    Contact Us
                </Link>
                <Dropdown/>
            </div>}
        </div>
    )
}

export default Navbar
