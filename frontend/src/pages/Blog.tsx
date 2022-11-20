import React, { useState, useEffect } from 'react'
import '../styles/home/Blogs.scss'
import { Link } from 'react-router-dom'
import client from '../client'
import {Helmet} from 'react-helmet'
function Blog() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        client
            .fetch(
                `*[_type == "post"] {
        title,
        slug,
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
            .then((data) => setPosts(data))
    }, [])

    return (
        <>
            <Helmet>
                <title>StayBook Blogs</title>
                <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
            </Helmet>
            <h1 className="heading">Blog page</h1>

            <div className="blogsContainer">
                {posts.map((post: any) => (
                    <article key={post.slug.current}>
                        <img src={post.mainImage.asset.url} alt={post.title} />
                        <h3>{post.title}</h3>
                        <Link
                            className="button"
                            to={`/blogs/${post.slug.current}`}
                        >
                            Read Full Article
                        </Link>
                    </article>
                ))}
            </div>
        </>
    )
}

export default Blog
