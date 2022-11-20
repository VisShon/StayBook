import React, { useState } from 'react'
import '../styles/Amneties.scss'

function Ameneties({ data }: any) {
    const [visible, setVisible] = useState(5)
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + data.length)
    }
    const showLessItems = () => {
        setVisible(5)
    }

    return (
        <>
            <h2>Amenities</h2>
            <div className="details">
                {data.slice(0, visible).map((amenety: any, index: number) => (
                    <h1
                        className="amenities"
                        key={index}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src={amenety.item.image?.asset.url}
                            style={{ width: '2rem' }}
                            alt={amenety.item.name}
                        />
                        {amenety.item.name}
                    </h1>
                ))}
                {visible < data.length ? (
                    <div
                        style={{ cursor: 'pointer', fontSize: '2rem' }}
                        onClick={showMoreItems}
                    >
                        +
                    </div>
                ) : (
                    <div
                        style={{ cursor: 'pointer', fontSize: '1rem' }}
                        onClick={showLessItems}
                    >
                        Less...
                    </div>
                )}
            </div>
        </>
    )
}

export default Ameneties
