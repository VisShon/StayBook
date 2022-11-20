import React, { useState, useEffect } from 'react'
import '../../styles/home/Profile.scss'
import client from '../../client'

function ProfileHistory({ hotel }: any) {
    const [data, setData] = useState<any>()
    useEffect(() => {
        client
            .fetch(
                `*[slug.current == "${hotel}"]{
        slug,
        name,
        images[]{
          asset -> {
            _id,
            url
          },
          alt
        },
      }`
            )
            .then((res) => setData(res[0]))
    }, [])
    return (
        <>
            {!data ? (
                <></>
            ) : (
                <div className="history">
                    <img src={data.images[0].asset.url} alt={data.name}/>
                    <div className="historyInfo">
                        <h2>{data.name}</h2>
                        <a href={`/${data.slug.current}`} className="button">
                            Book Again
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileHistory
