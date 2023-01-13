import React, { useState, useEffect } from "react";
import "../styles/home/Blogs.scss";
import client from "../client";
import { Helmet } from "react-helmet";
import BlogCard from "../components/BlogCard";
import logo from "../images/faviconlogo.png";
function Blog() {
  const [posts, setPosts] = useState([]);

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
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>StayBook Blogs</title>
        <meta
          name="description"
          content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
        />
      </Helmet>
      <div className="blogHeader">
        <img src={logo} alt="StayBook Hotels" />
        <h4 className="heading">Blog page</h4>

        <span className="sr-only">Search</span>
        {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2"> */}
          {/* <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg> */}
        {/* </span> */}
        {/* <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm blogSearch"
          placeholder="Search blogs"
          type="text"
          name="search"
        /> */}
      </div>

      <div className="blogsContainer">
        {posts.map((post: any) => (
          <BlogCard post={post} />
        ))}
      </div>
    </>
  );
}

export default Blog;
