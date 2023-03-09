import React, { useEffect } from 'react'
import tourImage from '../../../images/travel.svg'
import '../../../styles/home/ToursandTravels.scss'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, translateY: '2vw' },
}

function ToursandTravels() {
    const control = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            control.start('visible')
        } else {
            control.start('hidden')
        }
    }, [control, inView])

    return (
        <>
            <img className="toursImage" src={tourImage} alt='Tour packge'/>
            <motion.div
                className="toursContent"
                ref={ref}
                variants={boxVariant}
                initial="hidden"
                animate={control}
            >
                <h1> Tours and Travels</h1>
                <p>
                    Staybook offers customised family trips tailored to the
                    needs of any family, large or small, with youngsters or the
                    elderly. It's a fantastic chance to spend quality time
                    together in a fantastic location.
                </p>
                <a className="button" href="/packages">
                    Find more
                </a>
            </motion.div>
        </>
    )
}

export default ToursandTravels
