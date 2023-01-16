import React, { useState, useEffect } from "react";
import "../styles/home/SinglePost.scss";
import { Link, useParams } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { Helmet } from "react-helmet";
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
            }
          }`
      )
      .then((data) => setSinglePost(data[0]));
    setIsLoading(false);
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
          <section className="postBody">
            <h4>{singlePost.title}</h4>
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
        </>
      )}
    </>
  );
}

export default SinglePost;
