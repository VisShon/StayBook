import React from 'react'
import "../styles/home/SinglePost.scss";
export default function (props) {
  return (
    <>
      <div className="topicHeading">{props.heading}</div>
      <div className="topicDesc">
        {props.allContent}
      </div>
    </>
  );
}
