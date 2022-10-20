import React, { useState } from 'react'
import '../styles/PhotoSlider.scss'
import left from '../images/left.png'
import right from '../images/right.png'

function PhotoSlider({ data }: any) {
    const wind = window.matchMedia('(max-width: 800px)')
    const [n, setN] = useState(0)

    return (
        <div className="photoSlider">
            <img className="mainImage" src={data[n].asset.url} />
            <div className="gallery">
                {data.map((item: any, index: number) => (
                    <img
                        onClick={() => setN(index)}
                        className={n != index ? 'image' : 'image-selected'}
                        src={item.asset.url}
                        key={index}
                    />
                ))}
            </div>
            <a
                onClick={() => {
                    n == 0 ? setN(0) : setN((prev) => --prev)
                }}
                className="leftIcon"
            >
                <img
                    style={
                        !wind.matches ? { width: '5rem' } : { width: '3rem' }
                    }
                    src={left}
                />
            </a>
            <a
                onClick={() => {
                    n == data.length - 1
                        ? setN(data.length - 1)
                        : setN((prev) => ++prev)
                }}
                className="rightIcon"
            >
                <img
                    style={
                        !wind.matches ? { width: '5rem' } : { width: '3rem' }
                    }
                    src={right}
                />
            </a>
        </div>
    )
}

export default PhotoSlider
