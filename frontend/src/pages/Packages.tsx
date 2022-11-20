import React, { useState, useEffect } from 'react'
import Package from '../components/home/Package'
import '../styles/home/Package.scss'
import client from '../client'
import {Helmet} from 'react-helmet'
function Packages() {
    const [packages, setPackages] = useState([])
    useEffect(() => {
        client
            .fetch(
                `*[_type == "package"] {
        name,
        time,
        description,
        highlight,
        image {
          asset -> {
            _id,
            url
          },
          alt
        }
      }`
            )
            .then((data) => setPackages(data))
    }, [])

    return (
        <>
            <Helmet>
                <title>StayBook Tour Package</title>
                <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
            </Helmet>
            <div className="packagePageBody">
                <h1>Tour Packages</h1>
                {packages.map((p: any, i) => (
                    <Package
                        name={p.name}
                        image={p.image.asset.url}
                        time={p.time}
                        description={p.description}
                        highlight={p.highlight}
                    />
                ))}
            </div>
        </>
    )
}

export default Packages
