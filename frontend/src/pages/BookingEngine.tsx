import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/App.scss";
import "../styles/BookingEngine.scss";
import Amneties from "../components/Ameneties";
import HotelDetails from "../components/HotelDetails";
import mmt from "../images/mmt.svg";
import mapImage from "../images/google_maps.svg";
import bc from "../images/bc.svg";
import tra from "../images/tra.svg";
import light from "../images/light.png";
import cross from "../images/cross.svg";
import BookingCard from "../components/BookingCard";
import MobileBookingCard from "../components/MobileBookingCard";
import Photos from "../components/PhotoSlider";
import PhotoGrid from "../components/PhotoGrid";
import RoomCard from "../components/RoomCard";
import { useParams } from "react-router-dom";
import client from "../client";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Spinner from "../components/Spinner";
import useMobile from "../hooks/UseMobile";

function App() {
  const [hotel, setHotel] = useState<any>(null);
  const { slug } = useParams();
  const [gallery, setGallery] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const guests = sessionStorage.getItem("guests");
  const prices = [150, 160, 90];

  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const [isMobVisible, setIsMobvisible] = useState(true);
  const isMobile = useMobile();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
          name,
          meta_title,
          meta_desc,
          description,
          phone,
          address,
          rooms[]{
            type,
            totalRooms,
            description,
            guests,
            info,
            plans[]{
              title,
              price,
              info,
              features,
              price_planner[]
            },
            ameneties,
            image{
              asset -> {
                _id,
                url
              },
              alt
            },
            images[]{
                asset -> {
                  _id,
                  url
                },
                alt
            },
          },
          email,
          map,
          amenities[]{
            "item":*[_type=='amenety' && _id ==^._ref][0]{
              name,
              image{asset -> {
                    _id,
                    url
                  },
                  alt
              },
            }
          },
          images[]{
            asset -> {
              _id,
              url
            },
            alt
          },
          hotel_description[],
          hotel_amenities[],
          hotel_nearby_places[]
        }`
      )
      .then((data) => setHotel(data[0]));
  }, []);

  const MinPrice = () => {
    let MinPrice: number = 0;
    let room: any = hotel.rooms.filter(
      (item: any) => item.guests == guests || !guests
    )[0];
    if (room) {
      MinPrice = room.plans[0].price;
    }
    return MinPrice;
  };

  const scrollToCard = () => {
    scrollRef.current!.scrollIntoView(true);
  };

  useEffect(() => {
    if (entry && entry.boundingClientRect.bottom <= 0) {
      setIsMobvisible(false);
    } else {
      setIsMobvisible(true);
    }
  }, [entry]);

  return (
    <>
      {hotel ? (
        <>
          <Helmet>
            <title>{hotel.meta_title ? hotel.meta_title : hotel.name}</title>
            <meta
              name="description"
              content={
                hotel.meta_desc
                  ? hotel.meta_desc
                  : "StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
              }
            />
            <meta
              name="robots"
              content={
                hotel.meta_desc
                  ? hotel.meta_desc
                  : "StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
              }
            />
          </Helmet>

          {!isMinimized ? (
            <div className="comparator">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Direct Price ₹{MinPrice()}</h2>
                <div onClick={() => setIsMinimized(true)}>X</div>
              </div>
              <div className="site">
                <img src={bc} alt={"Booking.com Hotels"} />
                Booking.com
                <p>₹{MinPrice() + prices[Math.floor(Math.random() * 3)]}</p>
              </div>
              <div className="site">
                <img src={mmt} alt={"Make My Trip Hotels"} />
                Make My Trip
                <p>₹{MinPrice() + prices[Math.floor(Math.random() * 3)]}</p>
              </div>
              <div className="site">
                <img src={tra} alt={"Trip Advisor Hotels"} />
                Trip Advisor
                <p>₹{MinPrice() + prices[Math.floor(Math.random() * 3)]}</p>
              </div>
            </div>
          ) : (
            <div className="comparator" onClick={() => setIsMinimized(false)}>
              <img
                alt="StayBook"
                src={light}
                style={{ width: "1.5rem", objectFit: "cover" }}
              />
            </div>
          )}

          {gallery ? (
            <Photos data={hotel.images} />
          ) : (
            <PhotoGrid data={hotel.images} />
          )}
          {!gallery ? (
            <div
              className="galleryButton"
              onClick={() => setGallery((prev) => !prev)}
            >
              Open gallery
            </div>
          ) : (
            <img
              className="cross"
              src={cross}
              alt={"Staybook Hotels"}
              onClick={() => setGallery((prev) => !prev)}
            />
          )}
          <div className="Maincontainer">
            <div className="sideContainer">
              <h3 className="hotelTitleEngine">{hotel.name}</h3>
              <>
                <p className="description">{hotel.description}</p>
                <a
                  href={hotel.map}
                  className="description"
                  style={{ fontSize: "1rem" }}
                >
                  <img src={mapImage} alt={"Staybook Hotels"} />
                  {hotel.address}
                </a>
                <p className="contact">
                  <span className="detail">
                    PHONE:
                    <span
                      style={{
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      {hotel.phone}
                    </span>
                  </span>
                  <span className="detail">
                    EMAIL:
                    <span
                      style={{
                        color: "black",
                        fontWeight: "400",
                      }}
                    >
                      {hotel.email}
                    </span>
                  </span>
                </p>
                <iframe
                  width="450"
                  height="250"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAGvy5rBo-MPjD0vR2BkkRhtKAXmFHCLVY&q=${encodeURIComponent(
                    hotel.address
                  )}`}
                  allowFullScreen
                ></iframe>
              </>
              <Amneties data={hotel.amenities} />
              <h3 className="heading">{"Choose your room(s)"}</h3>
              {hotel.rooms
                .filter((item: any) => !guests || item.guests >= guests)
                .map((room: any, i: number) => (
                  <RoomCard room={room} key={i} />
                ))}
              {hotel.hotel_amenities ? <HotelDetails hotel={hotel} /> : null}

              {hotel.name == "Staybook Atlanta New Delhi Train Station" && (
                <div className="faqContainer">
                  <h2 className="heading">FAQs</h2>
                  <div className="question">
                    What amenities does the hotel offer?
                  </div>
                  <div className="answer">
                    Staybook Atlanta offers a wide range of amenities, such as
                    free water bottle, Wi-Fi, parking, round the clock room
                    service & help desk, restaurant, toiletries, towel, hair
                    dryer, daily cleaning.
                  </div>
                  <div className="question">
                    What types of rooms are available?
                  </div>
                  <div className="answer">
                    There are 4 types of room in Staybook Atlanta such as
                    standard double room, superior deluxe double or twin room,
                    triple room with city view, and family studio. Each room is
                    unique and furnished with wooden furniture with all required
                    amenities.
                  </div>
                  <div className="question">
                    What is the check-in and check-out time at Staybook Atlanta?
                  </div>
                  <div className="answer">
                    Check-in time is 12:00 Noon, while check-out time is 11:00
                    in the morning. You may request early check-in and late
                    check-out with some extra charge.
                  </div>
                  <div className="question">
                    Is breakfast, lunch and dinner available?
                  </div>
                  <div className="answer">
                    Yes, The accommodation provides breakfast, lunch and dinner
                    with room service.
                  </div>
                  <div className="question">
                    Is there a shuttle service to and from the airport?
                  </div>
                  <div className="answer">
                    Yes, Staybook Atlanta offers paid airport pick-up & drop.
                  </div>
                  <div className="question">
                    Is there a concierge service available?
                  </div>
                  <div className="answer">
                    Yes, The hotel has 24/7 a concierge desk that can assist
                    guests with things like restaurant reservations,
                    transportation, and local attractions
                  </div>
                  <div className="question">
                    What is the cancellation policy?
                  </div>
                  <div className="answer">
                    Guests should have to cancel 72 hr prior to the check-in
                    date otherwise the hotel will charge 100% as cancellation
                    charge.
                  </div>
                  <div className="question">Are pets allowed? </div>
                  <div className="answer">
                    Yes, Pets are allowed at Staybook Atlanta with additional
                    fees of 800/pet per night.
                  </div>
                  <div className="question">
                    Is there a parking facility available?
                  </div>
                  <div className="answer">
                    Yes The hotel has free on-site parking facilities for their
                    guests.
                  </div>
                  <div className="question">
                    Is the hotel located in a convenient area?
                  </div>
                  <div className="answer">
                    Staybook Atlanta is located near New Delhi train station
                    also jama masjid, sadar bazar, chandni chowk, karol bagh,
                    and connaught place are the some nearest places to the
                    hotel.
                  </div>
                </div>
              )}

              {hotel.name == "Staybook Jyoti Mahal A Heritage Hotel" && (
                <div className="faqContainer">
                  <h2 className="heading">FAQs</h2>

                  <div className="question">
                    What is the check-in and check-out time at Staybook Jyoti
                    Mahal?
                  </div>
                  <div className="answer">
                    Check-in time is generally 12:00 Noon or later, and
                    check-out time is 11:00 am or earlier. You may request for
                    early check-in and late check out, it depends upon the
                    availability. You can keep your luggage in our storage room
                    before check-in and after check-out without any additional
                    fees.
                  </div>
                  <div className="question">
                    Do you offer airport shuttle service?
                  </div>
                  <div className="answer">
                    Yes, Staybook Jyoti Mahal offers paid airport shuttle
                    service. Guests should check with the hotel directly to see
                    if this service is available.
                  </div>
                  <div className="question">
                    What is the cancellation policy?
                  </div>
                  <div className="answer">
                    Guests should have to cancel 72 hr prior to the check-in
                    date otherwise the hotel will charge 100% of the booking
                    amount as the cancellation charge.
                  </div>
                  <div className="question">
                    Is there an age restriction for booking a room at Staybook
                    Jyoti Mahal?
                  </div>
                  <div className="answer">
                    Yes, guests must be at least 18 years old to book a hotel
                    room.
                  </div>
                  <div className="question">Are pets allowed in the hotel?</div>
                  <div className="answer">
                    Staybook Jyoti Mahal does allow pets for an additional fee
                    800/pet per night.
                  </div>
                  <div className="question">
                    Do you have a restaurant on site, and what is the opening
                    timing?
                  </div>
                  <div className="answer">
                    Yes, We have an on-site restaurant, and it is open 6:30 am
                    to 11:30 pm.
                  </div>
                  <div className="question">
                    Do you offer free Wi-Fi, and is it available in all rooms?
                  </div>
                  <div className="answer">
                    Yes, the hotel offers free & very high speed Wi-Fi in all
                    rooms and entire hotel premises
                  </div>
                  <div className="question">
                    Do you offer room service, and what are the timings?
                  </div>
                  <div className="answer">
                    Yes, you’ll get 24/7 room service.
                  </div>
                  <div className="question">
                    What types of payment do you accept?
                  </div>
                  <div className="answer">
                    You can pay via Cash, Card, and with payment links. We
                    accept major credit cards, such as Visa, Mastercard, and
                    American Express.
                  </div>
                  <div className="question">
                    Are there any additional parking fees?
                  </div>
                  <div className="answer">
                    No, We have on site parking and it is free of cost.
                  </div>
                  <div className="question">Are smoking rooms available?</div>
                  <div className="answer">
                    Yes, Staybook Jyoti Mahal has both non-smoking and smoking
                    rooms available, all rooms are cross ventilated. It also has
                    a common smoking area on the rooftop
                  </div>
                  <div className="question">
                    Is breakfast included in the room rate?
                  </div>
                  <div className="answer">
                    It depends upon the booking you made, The hotels offer
                    different meal plans with the room.
                  </div>
                  <div className="answer">EP Plan: Room Only</div>
                  <div className="answer">
                    CP Plan: Room with complimentary breakfast
                  </div>
                  <div className="answer">
                    MAP plan: Room with complimentary breakfast and lunch/dinner
                  </div>
                  <div className="answer">
                    AP Plan: Room with complimentary breakfast, lunch and
                    dinner.
                  </div>
                  <div className="answer">
                    You have to select the meal plans while making the
                    reservation.
                  </div>
                  <div className="question">
                    Are there any nearby attractions you recommend?
                  </div>
                  <div className="answer">
                    There are so many things to do near Staybook Jyoti Mahal
                    such as visit Lal Quila, Jama Masjid, Gurudwara Bangla Sahib
                    eat Delhi’s most famous street food like Chole Bhature,
                    Chur-Chur naan, Chats, Butter Chicken, banke bihari ka
                    samosa and gulab jamun and shopping at chandni chowk, karol
                    bagh, connaught place and sarojini nagar.
                  </div>
                  <div className="question">
                    Do you offer laundry service for guests?
                  </div>
                  <div className="answer">
                    Yes, the property offers paid laundry service for guests.
                  </div>
                  <div className="question">
                    Is there a 24-hour front desk available?
                  </div>
                  <div className="answer">
                    Yes always, the accommodation is provided round the clock
                    front desk to assist the guest with any needs or requests.
                  </div>
                </div>
              )}
            </div>
            {isMobile && <div ref={scrollRef} style={{ height: "15vh" }}></div>}
            <BookingCard
              cardRef={ref}
              hotelName={hotel.name}
              address={hotel.address}
            />
            {isMobile && !inView && isMobVisible && (
              <MobileBookingCard scrollToCard={scrollToCard} />
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
