import React, { useState,useEffect } from "react";
import '../../styles/NavBar.scss';
import { useNavigate } from "react-router-dom";
import client from '../../client';

function Dropdown(){
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
      client
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
  }, [])

const nav = useNavigate();
return(
    <ul>
      <li>
        <span aria-haspopup="true">Hotels</span>
        <ul className="dropdown" aria-label="submenu">
          {Object.values(data).map((item:any,i:any)=>
          (<li className = "hotels" key={i} onClick={()=>nav(`/${item.slug.current}`)}>
                <a style={{textDecoration:'none',color:'black'}} 
                   href={`/${item.slug.current}`}>{item.name}</a>
            </li>))}
        </ul>
      </li> 
    </ul>
  )

}


export default Dropdown;