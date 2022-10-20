import React, { useEffect, useState } from 'react'
import '../../../styles/home/HotelCarousel.scss'
import { useAnimation, motion } from 'framer-motion'
import leftArrow from '../../../images/leftArrow.svg'
import rightArrow from '../../../images/rightArrow.svg'
import client from '../../../client'

const boxVariant = {
    visible: { opacity: 1, translateX: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, translateX: '10vw' },
}

function HotelCarousel() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const control = useAnimation()
    const [n, setN] = useState(0)

    useEffect(() => {
        control.start('hidden')
        control.start('visible')
    }, [control, n])

    useEffect(() => {
        const fetchedData = async () => {
            await client
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
                .then(() => {
                    control.start('visible')
                    setLoading(true)
                })
        }
        fetchedData()
    }, [])

    return (
        <div className="body">
            {loading && (
                <>
                    <motion.div
                        className="hotelCarouselBody"
                        initial="visible"
                        variants={boxVariant}
                        animate={control}
                    >
                        <div className="image">
                            <img src={data[n].images[0].asset.url} />
                            <div className="image-background"></div>
                        </div>

                        <div className="content">
                            <h2>{data[n].name}</h2>
                            <p>{data[n].description}</p>
                            <a
                                href={`/${data[n].slug.current}`}
                                className="button"
                            >
                                Book Now
                            </a>
                        </div>
                    </motion.div>

                    <div className="arrows">
                        <img
                            src={leftArrow}
                            onClick={() => {
                                setN((prev) => (prev == 0 ? prev : --prev))
                                n !== 0
                                    ? control.set('hidden')
                                    : control.set('visible')
                            }}
                        />
                        <img
                            src={rightArrow}
                            onClick={() => {
                                setN((prev) =>
                                    prev == data.length - 1 ? prev : ++prev
                                )
                                n !== data.length - 1
                                    ? control.set('hidden')
                                    : control.set('visible')
                            }}
                        />
                    </div>

                    <div className="progress">
                        {data.map((item, index) => (
                            <div className="progress-segment" key={index}>
                                <div
                                    className="outline tooltip"
                                    onClick={() => setN(index)}
                                    style={
                                        index !== n
                                            ? { borderColor: 'white' }
                                            : { borderColor: '#CF8F24' }
                                    }
                                >
                                    <div className="tooltiptext">
                                        {item.name}
                                    </div>
                                    <div className="circle"></div>
                                </div>
                                {index !== data.length - 1 && (
                                    <div className="line"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default HotelCarousel
