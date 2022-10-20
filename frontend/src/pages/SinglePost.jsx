import React, { useState, useEffect } from 'react'
import '../styles/home/Blogs.scss'
import { Link, useParams } from 'react-router-dom'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'

function SinglePost() {
    const [singlePost, setSinglePost] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { slug } = useParams()
    useEffect(() => {
        client
            .fetch(
                `*[slug.current == "${slug}"] {
            title,
            body,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt
            }
          }`
            )
            .then((data) => setSinglePost(data[0]))
        setIsLoading(false)
    }, [slug])

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <section className="postBody">
                    <h1>{singlePost.title}</h1>
                    <div className="background"></div>
                    {singlePost.mainImage && singlePost.mainImage.asset && (
                        <img
                            src={singlePost.mainImage.asset.url}
                            alt={singlePost.title}
                            title={singlePost.title}
                        />
                    )}
                    <div className="content">
                        <BlockContent
                            blocks={singlePost.body}
                            projectId="fifev1uu"
                            dataset="blogs"
                        />
                    </div>
                </section>
            )}
        </>
    )
}

export default SinglePost
