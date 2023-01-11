import React, { useEffect } from 'react'
import '../../../styles/home/Ameneties.scss'
import '../../../styles/home/ContactUs.scss'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, translateY: '2vw' },
}

const SocialMediaBox = () => {
    return (
        <div className="socialMediaBox">
            <a href="https://www.facebook.com/budgetfriendlyhotel" style={{color: '#4267B2'}}><FacebookIcon fontSize="inherit" color="inherit"/></a>
            <a href="https://www.instagram.com/staybook_1/"><div className="ig-icon"><InstagramIcon fontSize="inherit" color="inherit"/></div></a>
            <a href="https://www.linkedin.com/company/hotelier/" style={{color: '#0e76a8'}} ><LinkedInIcon fontSize="inherit" color="inherit"/></a>
        </div>
    )
}

function ContactUs() {
    const control = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            control.start('visible')
        } else {
            control.start('hidden')
        }
    }, [control, inView])

    const data = [
        {title:'Live Chat',
         link:'https://api.whatsapp.com/send/?phone=918527703312&text&type=phone_number&app_absent=0',
        },
        {title:'Email',
         link:'mailto:booking@staybook.in',
        },
        {title:'Text',
         link:'sms:+918527703312',
        },
        {title:'Social Media',
         link:'https://www.instagram.com/staybook_1/',
        },
    ]

    return (
        <>
            <motion.div
                className="amenContent"
                ref={ref}
                style={{width:'100%'}} 
                variants={boxVariant}
                initial="hidden"
                animate={control}
            >
                <h2>Contact Us</h2>
                <p>Couldn't find what you were looking for? we are here to help on our 24/7 helplines</p>
                <div>
                    {data.map((item, i) => (
                        <a  target="_blank"
                            href={item.link}
                            style={{textDecoration:'none',cursor:'none'}}>
                            <Tilt className="amenety" 
                                  perspective={500} 
                                  key={i}>
                                <p>{item.title}</p>
                                {item.title != 'Social Media' ? <img
                                    src={require('../../../images/staybookContactus/' +
                                    item.title +
                                    '.svg')}
                                    alt={'Staybook Hotels Delhi'}
                                    />: <SocialMediaBox />}
                            </Tilt>
                        </a>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default ContactUs
