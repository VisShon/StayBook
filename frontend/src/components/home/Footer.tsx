import React, { useEffect, useState } from 'react'
import '../../styles/Footer.scss'
import footerBg from '../../images/footerBg.svg'
import logo from '../../images/logo.png'
import pdf from '../../pdf/TermsAndConditions.pdf'
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
        <div className="footerBody">
            <img src={footerBg} />

            <div className="logoCircle">
                <img src={logo} />
                <div className="line"></div>
                <a href="Tel: +91-8373929299">Ph. no: +91-8373929299</a>
                <a href="mailto: booking@staybook.in">booking@staybook.in</a>
            </div>

            <div className="linkCard">
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
                    <a href="https://www.instagram.com/staybook_1/">
                        Instagram
                    </a>
                    <a href="https://www.facebook.com/budgetfriendlyhotel?paipv=0&eav=AfZ-waWz6OajACPaAqHeTptaNS9Rt4i4iwbdVK0jE5KwoQfbZ6GsLkTVHLjTpMMeyxk">
                        Facebook
                    </a>
                    <a href="https://twitter.com/stayboook">Twitter</a>
                </div>

                <div className="heading">
                    <h2>Blogs:</h2>
                    <a href="/packages">Travel Packages</a>
                    <a href="/contactUs">Other Facilities</a>
                </div>

                <div className="heading">
                    <h2>Misc:</h2>
                    <a href={pdf}>Terms and Conditions</a>
                    <a href="/contactUs">Contact Us</a>
                    <a href="/packages">Tours and Packages</a>
                    <a href="/blogs">Blogs</a>
                    <a href="/contactUs">Feedback</a>
                </div>
            </div>
        </div>
    )
}
