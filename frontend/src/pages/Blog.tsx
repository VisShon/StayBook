import React,{useState,useEffect} from 'react';
import '../styles/home/Blogs.scss';
import {Link} from 'react-router-dom';
import client from "../client";

function Blog() {
  const [posts, setPosts] = useState([])
  console.log(posts)

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
        <h1 className='heading'>
          Blog page
        </h1>

        <div className='blogsContainer'>
          {posts.map((post:any) => (
            <article key={post.slug.current}>
              <img src={post.mainImage.asset.url} alt={post.title} />
              <h4>{post.title}</h4>
              <Link
                className='button'
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

export default Blog;