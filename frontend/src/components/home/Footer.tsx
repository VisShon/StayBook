import React, { useEffect, useState } from 'react'
import '../../styles/Footer.scss'
import footerBg from '../../images/footerBg.svg'
import logo from '../../images/logo.png'
import client from '../../client'

export default function Footer() {
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        client
            .fetch(
                `*[_type == "hotel"] {
        name,
        slug,
        description,
        images[]{
          asset -> {url},
        }
      }`
            )
            .then((data) => setData(data))
    }, [])

    return (
      <div className="footerBody noprint">
        <img src={footerBg} alt={"StayBook"} />

        <div className="logoCircle">
          <img src={logo} alt={"StayBook"} />
          <div className="line"></div>
          <p>2022 © StayBook, New Delhi. All rights reserved</p>
          <a href="Tel: +91-8373929299">Ph. no: +91-8373929299</a>
          <a href="mailto: booking@staybook.in">booking@staybook.in</a>
        </div>

        <div className="linkCard noprint">
          <div className="heading">
            <h2>Hotels:</h2>
            {Object.values(data).map((item: any, i: any) => (
              <a key={i} href={`/${item.slug.current}`}>
                {item.name}
              </a>
            ))}
          </div>

          <div className="heading">
            <h2>Socials:</h2>
            <a href="https://www.instagram.com/staybook_1/" target="_blank">
              Instagram
            </a>
            <a
              href="https://www.facebook.com/budgetfriendlyhotel?paipv=0&eav=AfZ-waWz6OajACPaAqHeTptaNS9Rt4i4iwbdVK0jE5KwoQfbZ6GsLkTVHLjTpMMeyxk"
              target="_blank"
            >
              Facebook
            </a>
            <a href="https://twitter.com/stayboook" target="_blank">
              Twitter
            </a>
          </div>

          <div className="heading">
            <h2>Interests:</h2>
            <a href="/packages">Tours and Packages</a>
            <a href="/blogs">Blogs</a>
            <a href="/aboutus">About Us</a>
            <a href="/contactUs">Contact Us</a>
            <a href="/FAQ">FAQ</a>
          </div>

          <div className="heading">
            <h2>Misc:</h2>
            <a href={"/termscondition"}>Terms and Conditions</a>
            <a href={"/privacypolicy"}>Privacy Policy</a>
            <a href={"/refundpolicy"}>Refund Policy</a>
            <a href={"/generalpolicy"}>General Policy</a>
          </div>
        </div>
      </div>
    );
}
