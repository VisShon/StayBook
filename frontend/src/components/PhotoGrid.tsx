import React from 'react'
import '../styles/PhotoSlider.scss'
import useMobile from '../hooks/UseMobile'

function PhotoGrid({ data }: any) {
    const isMobile = useMobile()

    return (
        <div className="photoGrid">
            <img className="image" src={data[0].asset.url + (isMobile ? '?w=550&h=500' : '')} alt={'StayBook'} />
            <div className="grid">
                {data.slice(1, 5).map((item: any, i: number) => (
                    <img className="image" alt={'Hotel Image'} key={i} src={item.asset.url + (isMobile ? '?w=150&h=100' : '')} />
                ))}
            </div>
        </div>
    )
}

export default PhotoGrid
