import React, { useEffect } from 'react'
import '../../../styles/home/Ameneties.scss'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'

const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, translateY: '2vw' },
}

function Ameneties() {
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
        'Parking',
        'Room Service',
        'Tour',
        'Breakfast',
        'Concierge',
        'Internet or Wi-Fi',
    ]

    return (
        <>
            <motion.div
                className="amenContent"
                ref={ref}
                variants={boxVariant}
                initial="hidden"
                animate={control}
            >
                <h2>Discover Benefits</h2>
                <div>
                    {data.map((item, i) => (
                        <Tilt className="amenety" perspective={500} key={i}>
                            <p>{item}</p>
                            <img
                                src={require('../../../images/staybookAmenities/' +
                                    item +
                                    '.svg')}
                            />
                        </Tilt>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default Ameneties
