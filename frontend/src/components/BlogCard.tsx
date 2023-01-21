import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/home/Blogs.scss";
import React from "react";

export default function BlogCard(props: any) {
  const nav = useNavigate();
  const showBlogDetails = () => {
    nav(`/blogs/${props.post.slug.current}`);
  }
  return (
    <article key={props.post.slug.current} className="blogCard" onClick={ showBlogDetails}>
        <img src={props.post.mainImage.asset.url} alt={props.post.title} />
        <h3>{props.post.title}</h3>
    {/* <Link className="button" to={`/blogs/${props.post.slug.current}`}>
      Read Full Article
    </Link> */}
      </article>

    // <div className="container">
    //   <h1 className="blogHeading">{props.post.title}</h1>
    //   <hr />
    //   <div className="imageAndLink">
    //     <img src={props.post.mainImage.asset.url} alt={props.post.title} />
    //     <Link className="button" to={`/blogs/${props.post.slug.current}`}>
    //       Read Full Article
    //     </Link>
    //   </div>
    // </div>
  );
}
