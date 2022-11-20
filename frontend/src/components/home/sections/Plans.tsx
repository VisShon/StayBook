import React, { useEffect } from 'react'
import plans from '../../../images/plan.png'
import '../../../styles/home/Plans.scss'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: 2 } },
    hidden: { opacity: 0, translateY: '10vw' },
}

function Plans() {
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
        <motion.div
            className="plansBody"
            initial="hidden"
            ref={ref}
            variants={boxVariant}
            animate={control}
        >
            <img src={plans} alt={'Staybook Hotels'}/>
            <div className="centerCard">
                <h2>Plan an Unforgettable Experience in Staybook!</h2>
                <p>
                    We can help you fit your stay and experience within your
                    allotted budget.
                </p>
                <a href="tel: +91-8373929299" className="contact">
                    Call for Support: +91-8373929299
                </a>
            </div>
        </motion.div>
    )
}

export default Plans
