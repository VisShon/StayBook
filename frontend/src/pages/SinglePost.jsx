import React, { useState, useEffect } from "react";
import "../styles/home/SinglePost.scss";
import { Link, useParams } from "react-router-dom";
import client from "../client";
import urlBuilder from '@sanity/image-url';
import BlockContent from "@sanity/block-content-to-react";
import { Helmet } from "react-helmet";
import BlogTableContent from "../components/BlogTableContent";
function SinglePost() {
  const [singlePost, setSinglePost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
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
            },
            description,
            bullet_points[],
            images[] {
               asset -> {
                _id,
                url
              },
              alt
            }
          }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        setIsLoading(false);
      });
  }, [slug]);

 return (
    <>
      <Helmet>
        <title>{singlePost.title ? singlePost.title : "StayBook Posts"}</title>
        <meta
          name="description"
          content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
        />
      </Helmet>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
          <div className="postBody">
            <h4>{singlePost.title}</h4>
            <div className="backgroundImg">
              {singlePost.mainImage && singlePost.mainImage.asset && (
                <img
                  src={singlePost.mainImage.asset.url}
                  alt={singlePost.title}
                  title={singlePost.title}
                />
              )}
            </div>
          </div>

          <div className="blogBody">
            <div className="blogContent">
               <div className="desc">
                <BlockContent
                  blocks={singlePost.body}
                  projectId="fifev1uu"
                  dataset="blogs"
                />
              </div>
              {toPlainText(singlePost.body)}

              <div className="tableOfContents">
                {singlePost.bullet_points.map((item, index) => (
                  <tr>
                    <td>{item.heading}</td>
                  </tr>
                ))}
              </div>

              <div className="allContent">
                {singlePost.bullet_points.map((item, index) => (
                  <div>
                    <div className="topicHeading">{item.heading}</div>
                     <div className="content">
                     <BlockContent
                        blocks={item.heading_content}
                        projectId="fifev1uu"
                        dataset="blogs"
                     />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="blogImages">
              {singlePost.images && (
                <>
                  {singlePost.images.map((item, index) => (
                    <img src={item.asset.url}></img>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SinglePost;
