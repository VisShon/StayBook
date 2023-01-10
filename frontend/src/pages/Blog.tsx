import React, { useState, useEffect } from 'react'
import '../styles/home/Blogs.scss'
import client from '../client'
import {Helmet} from 'react-helmet'
import BlogCard from '../components/BlogCard'
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
            <div className="blogHeader">
                <h4 className="heading">Blog page</h4>
            </div>

            <div className="blogsContainer">
                {posts.map((post: any) => (
                    <BlogCard post = {post}/>
                ))}
            </div>
        </>
    )
}

export default Blog
