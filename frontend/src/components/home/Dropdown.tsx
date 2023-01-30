import React, { useState, useEffect } from 'react'
import '../../styles/NavBar.scss'
import { Link, useNavigate } from 'react-router-dom'
import client from '../../client'

function Dropdown() {
    const [data, setData] = useState<any[]>([])
    const [dropdown, setDropdown] = useState(false)
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
      <div
        className="hotels-dropdown noprint"
        onMouseLeave={() => setDropdown(false)}
      >
        <Link
          to="/hotels"
          className="item"
          onMouseEnter={() => setDropdown(true)}
        >
          Hotels
        </Link>
        <ul
          className={"dropdown" + (dropdown ? "" : " hidden")}
          aria-label="submenu"
        >
          {Object.values(data).map((item: any, i: any) => (
            <li
              className="hotels"
              key={i}
              onClick={() => nav(`/hotels/${item.slug.current}`)}
            >
              <a
                href={`/hotels/${item.slug.current}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Dropdown
