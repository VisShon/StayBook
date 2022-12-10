import React, { useState, useEffect } from 'react'
import '../../styles/NavBar.scss'
import { useNavigate } from 'react-router-dom'
import client from '../../client'

function Dropdown() {
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        client
            .fetch(
                `*[_type == "navoptions"] {
                    name,
                    slug,
                }`
            )
            .then((data) => setData(data))
    }, [])

    const nav = useNavigate()
    return (
        <ul>
            <li>
                <a  href='/hotels' 
                    style={{textDecoration:'none',color:'black'}} 
                    aria-haspopup="true">
                        Hotels</a>
                <ul className="dropdown" aria-label="submenu">
                    {Object.values(data).map((item: any, i: any) => (
                        <li
                            className="hotels"
                            key={i}
                            onClick={() => nav(`/hotels/${item.slug.current}`)}
                        >
                            <a 
                                href={`/hotels/${item.slug.current}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    )
}

export default Dropdown
