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
        control.start('visible')
    }, [control, n])

    useEffect(() => {
        const fetchedData = async () => {
            await client
                .fetch(
                `*[_type == "hotel"] {
                    name,
                    order,
                    slug,
                    description,
                    images[]{
                      asset -> {url},
                    }
                  }`
            )
            .then((data) => {
                data.sort((a: any, b: any) => a.order - b.order)
                setData(data)
            })
            .then(() => {
                setLoading(true)
           })

        }

        fetchedData()
    }, [])

    useEffect(() => {
        if (data.length == 0) return

        setInterval((setN, data, control) => {
            setN(n => (n + 1) % data.length)
            control.set('hidden')
        }, 5000, setN, data, control)
 
    }, [data])

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
                        <a href={`/${data[n].slug.current}`} className="image">
                            <img src={data[n].images[0].asset.url} alt={data[n].name}/>
                            <img className="image-second" src={data[n].images[1].asset.url} alt={data[n].name}/>
                        </a>

                        <div className="content">
                            <a href={`/${data[n].slug.current}`}>{data[n].name}</a>
                            <p>{data[n].description}</p>
                        </div>
                    </motion.div>

                    <div className="progress">
                        {data.map((item, index) => (
                            <div className="progress-segment" key={index}>
                                <div
                                    className="outline tooltip"
                                    onClick={() => {setN(index);
                                        control.set('hidden')}}
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
