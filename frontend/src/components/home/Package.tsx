import React from 'react'
import '../../styles/home/Package.scss'
import map from '../../images/map.svg'

export type props = {
    name: string
    image: any
    time: string
    description: string
    highlight: string
}

function Package({ name, image, time, description, highlight }: props) {
    return (
        <div className="packageBody">
            <img src={image} alt='package'/>
            <h1>{name}</h1>
            <h2>{time}</h2>
            <a href="/contactus" className="button">
                Enquire
            </a>
            <p>{description}</p>

            <div className="locationBody">
                <div className="title">
                    <h2>Locations Covered</h2>
                    <img src={map} alt='map locations'/>
                </div>
                <h1>Noteworth Points</h1>
                <p>{highlight}</p>
            </div>
        </div>
    )
}

export default Package
