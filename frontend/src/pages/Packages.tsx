import React, { useState, useEffect } from 'react'
import Package from '../components/home/Package'
import '../styles/home/Package.scss'
import client from '../client'

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
        <div className="packagePageBody">
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
    )
}

export default Packages
