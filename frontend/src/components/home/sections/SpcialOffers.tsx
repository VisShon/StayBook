import React,{useEffect, useState} from 'react';
import client from '../../../client';
import '../../../styles/home/SpecialOffer.scss'
function SpcialOffers() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchedData = async () => {
            await client
                .fetch(
                    `*[_type == "offer"] {
                    name,
                    description,
                    image{
                    asset -> {url},
                    }
                }`
                )
                .then((data) => setData(data))
                .then(() => {
                    setLoading(false)
                })
        }
        fetchedData()
    }, [])
  return (
    <>
        <h1 className="offerTitle">Special Offers</h1>
        <div className="offersContainer">
            {
                loading ?'Loading...':
                data.map((item,i) =>(<div className="offerCard">
                    <img src={item.image.asset.url} alt={item.name}/>
                    <h2>{item.name}</h2>
                    <p>{item.description.slice(0,250)}</p>
                    <a href="#bookingBar">Book Now</a>
                </div>))
                
            }
        </div>
    </>
  )
}

export default SpcialOffers