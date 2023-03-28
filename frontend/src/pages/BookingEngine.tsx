import { useState, useEffect, useRef, useContext } from 'react'
import '../styles/App.scss'
import '../styles/BookingEngine.scss'
import Amneties from '../components/Ameneties'
import HotelDetails from '../components/HotelDetails'
import mmt from '../images/mmt.svg'
import mapImage from '../images/google_maps.svg'
import bc from '../images/bc.svg'
import tra from '../images/tra.svg'
import light from '../images/light.png'
import cross from '../images/cross.svg'
import BookingCard from '../components/BookingCard'
import MobileBookingCard from '../components/MobileBookingCard'
import Photos from '../components/PhotoSlider'
import PhotoGrid from '../components/PhotoGrid'
import RoomCard from '../components/RoomCard'
import { useParams, useSearchParams } from 'react-router-dom'
import client from '../client'
import {Helmet} from 'react-helmet'
import { useInView } from 'react-intersection-observer';
import Spinner from '../components/Spinner';
import useMobile from '../hooks/UseMobile'
import HotelContext from '../context/HotelContext'
import { useAppDispatch, useAppSelector } from '../app/hooks'


function App() {
  const addNDay = (startDate: Date, numOfDays: number|string) => {
    const result = new Date(startDate);
    result.setDate(result.getDate() + Number(numOfDays));
    return result;
  }
  
  const getDateDifference = (checkInDate: Date, checkOutDate: Date) => {
    var timeDiff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    var dayDiff =  timeDiff / (1000 * 3600 * 24);
    return Math.ceil(dayDiff);
  }

    const {
      checkIn, 
      checkOut, 
      setCheckIn,
      setCheckOut,
      guests,
      setGuests
    } = useContext(HotelContext);

    const isMobile = useMobile()
    const dispatch = useAppDispatch();
    const {slug} = useParams()
    
    const prices = [150, 160, 90]
    const [searchParams, setSearchParams] = useSearchParams();
    const [hotel, setHotel] = useState<any>(null)
    const [gallery, setGallery] = useState<boolean>(false)
    const [isMinimized, setIsMinimized] = useState<boolean>(false)
    const [isMobVisible, setIsMobvisible] = useState(true)

    const scrollRef = useRef<HTMLDivElement>(null)
    const { ref, inView, entry } = useInView({
      threshold: 0
    })

    useEffect(() => {



        client
          .fetch(
            `*[_type=='hotel' && (slug.current == "${slug}" || id == "${slug}")]{
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
    }, [])

    useEffect(() => {
      if (entry && entry.boundingClientRect.bottom <= 0) {
        setIsMobvisible(false)
      } else {
        setIsMobvisible(true)
      }
    }, [entry])

    const MinPrice = () => {
        let MinPrice: number = 0
        let room: any = hotel.rooms.filter(
            (item: any) => item.guests == guests || !guests
        )[0]
        if (room) {
            MinPrice = room.plans[0].price
        }
        return MinPrice
    }

    const scrollToCard = () => {
      scrollRef.current!.scrollIntoView(true)
    }
  
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
                  .filter((item: any) => item.guests == guests || !guests)
                  .map((room: any, i: number) => (
                    <RoomCard room={room} key={i} />
                  ))}
                {hotel.hotel_amenities ? <HotelDetails hotel={hotel} /> : null}
              </div>
              {isMobile && (
                <div ref={scrollRef} style={{ height: "15vh" }}></div>
              )}
              <BookingCard
                cardRef={ref}
                hotelName={hotel.name}
                address={hotel.address}
                hotelId={slug}
                hotelNameSlug={slug}
                checkInVal={checkIn}
                checkOutVal={checkOut}
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

export default App