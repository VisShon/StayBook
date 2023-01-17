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
  
  let array = [
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",  
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  ];
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

            {/* <div className="content">
                <BlockContent
                  blocks={singlePost.body}
                  projectId="fifev1uu"
                  dataset="blogs"
                />
              </div> */}
          </div>

          <div className="blogBody">
            <div className="blogContent">
              <div className="desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
                asperiores, minima eos corporis voluptatum ad incidunt ratione!
                Fuga necessitatibus molestiae voluptatum veniam? Dolores facilis
                odit suscipit accusamus. Sunt fuga veniam rem sint
                exercitationem consectetur, perferendis perspiciatis praesentium
                expedita? Laborum sed maxime nulla ad quos impedit minus ipsum
                nemo commodi atque corporis sit repellat enim modi delectus
                distinctio voluptatibus molestias reprehenderit at cum minima
                eius, labore quod dolorem! Cupiditate deserunt voluptas in
                excepturi facilis veritatis tempore doloribus nemo aperiam
                harum? Debitis! Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Ex sed nemo maiores pariatur laboriosam vitae
                tempore nulla soluta. Enim, eius.
              </div>

              <div className="tableOfContents">
                {array.map((post) => (
                  <tr>
                    <td>{post}</td>
                  </tr>
                ))}
              </div>

              <div className="allContent">
                {array.map((post) => (
                  <>
                    <div className="topicHeading">{post}</div>
                    <div className="topicDesc">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum porro repellendus obcaecati officia temporibus,
                      quisquam pariatur unde similique excepturi beatae repellat
                      ipsum voluptates quo minus commodi. Cum totam beatae vitae
                      excepturi ipsum aut provident cupiditate quas asperiores
                      fugit aperiam nihil, exercitationem molestiae, atque esse
                      ipsam? Molestiae doloremque molestias dicta saepe
                      perferendis recusandae reiciendis modi quae? Laborum,
                      pariatur id? Quam, ut excepturi blanditiis fugit cumque
                      architecto accusamus expedita ducimus facilis enim nihil
                      voluptatibus eum omnis perspiciatis eius. Officiis ipsum
                      dolor quasi.

                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="blogImages">
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt="Pics"
              />
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt="Pics"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SinglePost;
