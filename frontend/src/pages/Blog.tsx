import React, { useState, useEffect } from "react";
import "../styles/home/Blogs.scss";
import client from "../client";
import { Helmet } from "react-helmet";
import BlogCard from "../components/BlogCard";
import logo from "../images/faviconlogo.png";
import { Link } from "react-router-dom";
function Blog() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])

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
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
  }, []);

  const handleChange = (e: any) => {
    setQuery(e.target.value)
  }

  const toPlainText = (blocks: any[]) => {
    return blocks
      .map(block => {
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        return block.children.map((child: any) => child.text).join('')
      })
      .join('\n\n')
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const filter: any[] = [];
    posts.forEach(post => {
      if (post.title.toLowerCase().includes(query.toLowerCase()) || 
          toPlainText(post.body).toLowerCase().includes(query.toLowerCase())) {
        filter.push(post)
      }
    })
    setFilteredPosts(filter)
  }


  return (
    <>
      <div className="outerFloat">
        <div className="floating">
          <div className="innerFloat">
            <Link to="/hotels" className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <Helmet>
        <title>StayBook Blogs</title>
        <meta
          name="description"
          content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
        />
      </Helmet>
      <div className="blogHeader">
        <img src={logo} alt="StayBook logo" />
        <h4 className="heading">Blog page</h4>

        <span className="sr-only">Search</span>

        <form className="w-full flex justify-center" onSubmit={handleSubmit}>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm blogSearch"
            placeholder="Search blogs"
            type="text"
            name="search"
            value={query}
            onChange={handleChange}
          />

          <button
            id="searchBlogsButton"
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      <div className="blogsContainer">
        {filteredPosts.map((post: any) => (
          <BlogCard post={post} />
        ))}
      </div>
    </>
  );
}

export default Blog;
