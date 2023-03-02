import React, { useState, useEffect } from "react";
import "../styles/Hotel.scss";
import HotelCard, { Props } from "../components/HotelCard";
import { useParams } from "react-router-dom";
import client from "../client";
import { Helmet } from "react-helmet";
import Spinner from "../components/Spinner";

export type data = {
  name: string;
  slug: string;
  hotels: Array<{
    hotel: Props;
  }>;
};

function Hotels() {
  const [data, setData] = useState<data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
                  name,
                  hotels[]{
                    "hotel":*[_type=='hotel' && _id ==^._ref][0]{
                      name,
                      slug,
                      rating,
                      card_amenities,
                      card_amenities_ref[]{
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
                      rooms[0]{
                        plans[0],
                      },
                      images[]{
                        asset -> {url},
                      }
                    }
                  },
              }`
      )
      .then((data) => {
        data[0].hotels.sort((a: any, b: any) => a.order - b.order);
        setData(data[0]);
      })
      .then(() => setIsLoading(false));
  }, [slug]);

  const showMore = (index: string) => () => {
    var toHide = document.getElementById("more" + index);
    var toShow2 = document.getElementById("text" + index);
    var toShow1 = document.getElementById("less" + index);
    toHide!.style.display = "none";
    toShow2!.style.display = "block";
    toShow1!.style.display = "block";
  };
  const showLess = (index: string) => () => {
    var toHide1 = document.getElementById("less" + index);
    var toHide2 = document.getElementById("text" + index);
    var toShow = document.getElementById("more" + index);
    toHide1!.style.display = "none";
    toHide2!.style.display = "none";
    toShow!.style.display = "block";
    toShow?.scrollIntoView();
  };
  return (
    <>
      <Helmet>
        <title>{`StayBook Hotels`}</title>
        <meta
          name="description"
          content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels"
        />
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="hotelTitle">{data!.name}</h1>
          <div className="hotelContainer">
            {data!.hotels
              .map((item) => item.hotel)
              .map((hotel: Props, index: number) => (
                <HotelCard
                  name={hotel!.name}
                  rooms={hotel!.rooms}
                  images={hotel!.images}
                  slug={hotel!.slug}
                  rating={hotel!.rating}
                  key={index}
                  card_amenities={hotel!.card_amenities}
                  card_amenities_ref={hotel!.card_amenities_ref}
                />
              ))}
          </div>
          {/* {data!.name == "Hotels in Mussorie" && (
            <div className="aboutLocation">
              <h3 className="locationTitle">ABOUT MUSSOORIE</h3>
              <p className="locationDescription">
                Mussoorie is a hill station in the Dehradun district of
                Uttarakhand. It is located 35 km from Dehradun and 290 km from
                Delhi. It is a popular tourist destination and a gateway to the
                Garhwal Himalayas. The town is also known as the Queen of Hills
                or the Switzerland of India. It is a popular summer destination
                for the people of Delhi and the Northern Plains of India. The
              </p>

              <button
                id="more1"
                className="locationMoreButton"
                onClick={showMore("1")}
              >
                Read More
              </button>

              <div id="text1" style={{ display: "none" }} className="readMore">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                eaque, officiis alias minima temporibus facere maiores officia
                asperiores tenetur fugiat enim blanditiis est ea eius. Sequi
                dicta quis atque! Perferendis saepe maiores fugiat deserunt
                accusamus hic, esse debitis, voluptatibus praesentium at in ipsa
                ex nesciunt consequuntur dicta? Quos dolores hic veniam deserunt
                enim debitis eveniet?
              </div>

              <button
                id="less1"
                className="locationLessButton"
                onClick={showLess("1")}
              >
                Read Less
              </button>
            </div>
          )*/}
          {data!.name == "Hotels near New Delhi Railway Station" && (
            <div className="aboutLocation">
              <h3 className="locationTitle">ABOUT NEW DELHI RAILWAY STATION</h3>
              <p className="locationDescription">
                Delhi is heart of India. Delhi is divided into two parts - Old
                Delhi and New Delhi. Both districts have their own main railway
                station - Old Delhi and New Delhi. The New Delhi Railway Station
                is the largest and busiest railway station in the city. It
                serves as a major hub for the Indian Railways, connecting the
                national capital to other major cities and towns of India. With
                its extensive network and excellent facilities, it is one of the
                most important railway stations in the country. The National
                Capital Region includes Old and New Delhi and the surrounding
                metropolitan areas.chandni chowk acts as shopping spree for the
                rulers, paharganj share the boundary with the this and was one
                of largest wholesale market grains, later on the neighborhood
                area of paharganj daryaganj was merged in to sadar bazar that
                later turned in to asia's cheapest market.
              </p>

              <button
                id="more2"
                className="locationMoreButton"
                onClick={showMore("2")}
              >
                Read More
              </button>

              <div id="text2" style={{ display: "none" }} className="readMore">
                <div className="locationSubHeading">
                  New Delhi Railway Station -
                </div>
                <div className="placesToGo">
                  New Delhi Railway Station, which people also call NDRS is the
                  busiest railway station.New Delhi, is the national capital of
                  India. It is situated in the north-central part of the
                  country. There are 16 platforms, the first platform is located
                  on the Paharganj side and the other 16 platforms are located
                  on the side of Ajmeri Gate.New Delhi Railway Station is 2nd
                  busiest and largest railway station in India. On the daily
                  basis it carries more than 5 to 6 lakh passenger over 350
                  trains with 16 platforms. North side of the railway station
                  there is Connaught place which is just 1.5km away from New
                  Delhi Railway Station. This station has built by East India
                  company in 1926. In 2010 the New Delhi railway station was
                  developed in 2007 because of the commonwealth game held in
                  india in 2010. On that time there was only 5000 to 6000
                  passenger was suffer by train daily. till 1980 there are only
                  seven platforms in the station after some time in 1995 there
                  are 3 more new platforms built. during redevelopment in 2010
                  the total platform in New Delhi had sixteen. Around 235 trains
                  pass through the station daily, starting, ending, or crossing
                  over its 16 platforms. There is a wide variation in estimates
                  for daily footfall and the number of passengers handled based
                  upon different studies and seasons of the year. There are
                  approximately 2.12 lakh passengers inflowing and outflowing
                  daily other estimates place the number at around 5 lakh, which
                  can reach 6 lakh during the months of the festival season.
                  According to the officials of Indian Railways, the
                  redevelopment work of the New Delhi Railway Station is to be
                  done under the National Transit-Oriented Development Policy.
                  New Delhi railway station has been built because there was a
                  lot of traffic, and it was built for the convenience of the
                  people. Paharganj is a neighouhood of central delhi.its
                  located near new delhi railway station. There are lots of
                  places where you can visit. Like Connaught Place, Main Bazar,
                  Chandni Chowk,India Gate, etc. you can go where you want to go
                  From here you can go everywhere in very easy way Paharganj
                  main center is located in Delhi. It is also very close to the
                  metro station like Kashmere Gate Metro Station, New Delhi
                  Metro Station. Sadar Bazar Sadar Bazar is a bustling market
                  located 1 km away from Paharganj. it is one of the largest
                  national markets in India. Shoppers can find a wide range of
                  products here, including clothes, groceries, crockery, gift
                  items, and more. The market is constantly changing with the
                  festivals, offering special items such as Diwali goods, Holi
                  flowers, tricolor, kites, home decor items, Jhalar Ladiyas,
                  lights, greeting cards, Rakhi ki Rakhi during Rakhi days, and
                  even Chunri and accessories for parents during special
                  occasions. With so many options available, Sadar Bazaar is the
                  perfect place to find everything you need in the most
                  convenient and cost-effective way.
                </div>

                <div className="locationSubHeading">
                  Old New Delhi Railway station -
                </div>

                <div className="placesToGo">
                  Delhi Junction is also known as Old Delhi. It is the oldest
                  railway station in Delhi. The code of this railway station is
                  DLI. This is India's busiest railway station. It was built in
                  1864 near Chandni Chowk when the train from Calcutta used to
                  come to Delhi.It also has 16 stations. It is the biggest
                  railway station. Along with this, the above-mentioned New
                  Delhi Railway Station has also been described as big.It has
                  also been built along with the Yellow Line Metro, which is
                  closest to Chandni Chowk.The nearest metro station to take the
                  metro is Chandni Chowk, which is closest to Gate No 3.It runs
                  13000 passenger trains daily.
                </div>

                <div className="placesToGo">
                  <b>Facility available - </b>national and international food
                  stalls were open at New Delhi railway station in 2021 they
                  provide service 24/7 hours. There are some magazine and books
                  shops also available. If your train is late you can spend some
                  time with readings. Hence there are waiting room available,
                  executive lounges, per platform water vending machin
                  available, snack area ,Free wifi connectivity service was
                  launched there in 2014. The service of free wifi are available
                  there for limited time period after after user have to pay for
                  this service. There is also a waiting room where you can sit
                  and wait for your train. There is also a feeding room in this
                  waiting room where you can sit freely and feed your baby.
                  Platform No. 1 has many facilities like Wi-Fi, Clock Room,
                  Waiting Room, Retiring Room, Restaurant, Toilet, etc. The same
                  facility which is available on Platform Number 1 is also
                  available on Platform Number 16. Enquiry counter - Inquiry
                  counter is located on either side of the station which is at
                  the entrance of the main gate as you enter from Platform No. 1
                  which is towards Paharganj If You Enter From Platform No. 16
                  Ajmeri Gate, Then There Is an Inquiry Counter On Your Right
                  Side. Reservation Counter - here is a reservation counter also
                  where you can buy a ticket and book a train for your journey.
                  there are two types of trains the first one is
                  express/classics train the 2nd one is a local train. the local
                  train stop at every station for 4 to 5mnt but the express
                  train stops at the important station like the big railway
                  station Patel nagar, Gurgaon, etc. express train run faster
                  than the local train. like some trains' names superfast,
                  Shatabdi, Rajdhani, Garib Rath, etc., and Rajdhani is one of
                  the fastest runs.
                </div>
              </div>

              <button
                id="less2"
                className="locationLessButton"
                onClick={showLess("2")}
              >
                Read Less
              </button>
            </div>
          )}

          {data!.name == "Hotels in Paharganj" && (
            <div className="aboutLocation">
              <h3 className="locationTitle">ABOUT PAHARGANJ</h3>
              <p className="locationDescription">
                Paharganj is a lively neighborhood in the heart of Delhi, famous
                for its affordability and abundance of experiences. Whether
                you're looking for a budget-friendly hotel, street food,
                restaurants, there is lot of places to eat in Paharganj like
                Dominoes, KFC,burger king and may more.There are some couple
                friedly hotels in Paharganj delhi who provide service for
                couplesThere is large places to eat at paharganj but Sita Ram
                Diwan chand best. wide variety of shops for both domestic and
                international travelers, you'll find it all in Paharganj. With
                interconnected roads such as Sadar Bazar, Main Bazar, Connaught
                Palace, and Karol bagh, you can easily navigate the area and
                take advantage of the plentiful options of hotels, lodges,
                restaurants, and shops - all within close proximity. Come
                explore and experience yourself the wonders of Paharganj.
              </p>

              <button
                id="more3"
                className="locationMoreButton"
                onClick={showMore("3")}
              >
                Read More
              </button>

              <div id="text3" style={{ display: "none" }} className="readMore">
                Delhi Paharganj is a budget-friendly destination that attracts
                travelers from all over the world. Whether you are on a budget
                or not, there is a hotel in Paharganj for you.there is some
                famous 2 and 3 star hotels in Paharganj weather it’s business
                hotels in Paharganj or couple friendly hotel A visit here is
                sure to be a memorable experience for first-time travelers.
                Boasting a vibrant atmosphere and a wide range of street food
                and shopping opportunities, the area is full of life and beauty.
                Furthermore, 24/7 food availability ensures that visitors can
                enjoy local taste at any time. For added peace of mind, the area
                is monitored by CCTV surveillance provided by the New Delhi
                police for crime prevention.2 and 3 star hotels in Paharganj
                provide the best facility In paharganj as 4 star hotel provide
                service in their hotel. 2 and 3 star hotels in Paharganj are
                just 1km away from New Delhi Railway Station you can stay in
                this budget friendly hotel and explore the near places in
                evening
                <div className="locationSubHeading">
                  Tourist atraction in Paharganj Delhi -
                </div>
                <div className="placesToGo">
                  In Paharganj, Chuna Mandi is also famous for too many things
                  like for shopping, the best bar, Budjust-friendly hotels,
                  famous for business hotels in Pharganj travel agencies, and
                  money exchange agencies. Imperial Cinema is situated in Chuna
                  Mandi Paharganj once upon a time it was really famous now it’s
                  permanently closed behind this cinema there is a street which
                  is famous for their best hotels and service some are Feb
                  hotel, Hotel Shanti villa, Hotel Pinky villa By Staybook,
                  Hotel Jyoti Mahal ( A Heritage Hotel ) these hotel located in
                  Nalwa Street. These all are couple friendly hotels in
                  Paharganj Delhi. Hotel Pinky villa by Staybook is right
                  opposite Hotel Jyoti mahal ( A Heritage Hotel) This two are
                  from the Staybook company. It can be the best property if you
                  love Heritage site They promise to guests and provide the best
                  hospitality service on the highest level to satisfy guests and
                  expectations for better hospitality. Best location. Everything
                  is near whether it’s markets or food places. Momo’s is a
                  famous street food in Paharganj. Main bazaar market is famous
                  for its stuff like clothes, affordable home decor things,
                  chip, and budget-friendly restaurants, backpackers, affordable
                  hotels, and tour agencies located on this street. You can
                  exchange your money here. This is the best area for staying
                  before and after your trip to India.here are food Resturant
                  are also famous like tadka restaurant, Bistro 55 Roof Top
                  Restaurant and etc The Main Bazaar in Paharganj is a
                  must-visit for tourists and locals.This bustling street market
                  located near the New Delhi Railway Station is a one-stop shop
                  for all your shopping desires. If you book hotels in Paharganj
                  you must visit in Main Bazar market it’s fully crowded but
                  tourist love this area after dinner you can come here for walk
                  and have some shopping. You'll find western clothes,
                  traditional Indian garments such as ghagras and shorts,
                  t-shirts, western dresses, and even kolhapuri slippers. If
                  you're looking for a place to hang out with your family and
                  friends, the Main Market has plenty of cafes, bars,
                  andrestaurants to choose from,offering a variety of Indian and
                  South Indian dishes. The Chabad House is especially popular
                  with Israeli visitors,book hotels in Paharganj near Main
                  bazar. Business hotels in paharganj also available in Business
                  hotels in Paharganj located near Main bazar New delhi
                </div>
                <div className="locationSubHeading">
                  Street food in Paharganj For Foodies
                </div>
                <div className="placesToGo">
                  <b>Bikaner Sweets Corner - </b>There is lot of places to eat
                  in Paharganj, but Discover Bikaner famous sweet shop, located
                  right in the heart of Paharganj! Offering a wide variety of
                  delicious sweets and snacks at very reasonable prices, Bikaner
                  Sweets corner has something for everyone. Enjoy Bikaner's
                  famous Sohan Halwa, Royal Anjeer Barfi, Khajoor Barfi, and
                  more. Or, try out some of the delicious snacks like Chow Mein
                  Samosa, Paneer ka Pakoda, Aloo Samosa, and more - all
                  available here. Plus, it is open from 8 am to 11 pm, for your
                  convenience. Stop by Bikaner's famous sweet shop today and
                  find out why it's so popular in this area! Pahrganj is famous
                  for best street food.
                </div>
                <div className="placesToGo">
                  <b>Chawla de chur-chur naan - </b>Chawla de chur-chur naan is
                  renowned for its delicious Indian cuisine. The naan is
                  buttery, with accompaniments such as raita, salad, chole ki
                  sabzi, and rajma. There is a variety of naan available - aloo
                  naan and paneer naan. We highly recommend visiting it in
                  Paharganj.It is only 10 minutes away from New Delhi Railway
                  Station.
                </div>
                <div className="placesToGo">
                  <b>Sita Ram Chole Bhature-</b> This is the best Chole Bhature
                  shop and even they serve the best chole bhature Their Chole
                  Bhature is delicious, and not so oily, the Bhatura is stuffed
                  with paneer. With so much to offer, the Main Market in
                  Paharganj is the perfect place to spend an afternoon. Sita Ram
                  Chole Bhature is famous street food in paharganj. This
                  restaurant is Situated in Paharganj Chuna Mandi, The Heart Of
                  Paharganj. Just near The Railway Station of New Delhi and just
                  1.3km away from Connaught place It is one of the most famous
                  shops. Address: 2243, Rajguru Marg, Chuna Mandi, Paharganj,
                  New Delhi, Delhi 110055
                </div>
                <div className="placesToGo">
                  <b>Multan Moth Bhandar Kachori -</b> One of the best kachoris
                  I have tasted. The accompaniment to the kachoris was unique as
                  it contained cooked rice. For Rs 40/- two kachoris with moth
                  dal accompaniment are very cheap. Do try and visit the shop
                  whenever in Paharganj. It is very close to Bikaner Sweet Shop.
                  The kachoris and their accompaniments are served on leaves
                  which are disposed of in an eco-friendly manner. It's located
                  at Paharganj Gali no 6 Multani Dhandha near Modi Opticals.
                </div>
                <div className="placesToGo">
                  <b>Darbar Restaurant - </b> Darbar is also one of the best
                  places to eat at Paharganj which provides Experience the
                  amazing taste of delicious food from all around the world at
                  the famous Darbar Restaurant in Paharganj! Located right in
                  front of the famous Bikaner sweet shop, this restaurant serves
                  a wide variety of Indian, South Indian, and Chinese dishes.
                  Not only is the food here mouth-wateringly delicious, but it
                  is also prepared with utmost care and hygiene, ensuring that
                  you and your family can enjoy a meal without any health
                  concerns. Don't wait any longer - visit Darbar Restaurant
                  today and enjoy a delicious feast!
                </div>
                <div className="locationSubHeading">
                  Some famous markets in Paharganj
                </div>
                <div className="placesToGo">
                  <b>Chandni Chowk - </b>Chandni Chowk is one of the most
                  popular and iconic markets in Delhi, famous for its wedding
                  and ceremony clothes. Arun Saree is one of the best shops in
                  Nai Sarak, offering a wide variety of clothes for weddings and
                  other occasions at affordable prices. Located just a stone's
                  throw away from the iconic Red Fort, Chandni Chowk is also
                  home to the famous Natraj Dahi Bhalla shop, which serves the
                  most delicious and tasty Dahi Bhalla. Additionally, the old,
                  famous street known as 'Parathe Wali Gali' offers some of the
                  best parathas in Delhi. So if you're looking for the perfect
                  wedding attire, great food, or both, Chandni Chowk is the
                  place for you!
                </div>
                <div className="placesToGo">
                  <b>Sadar Bazar -</b> Sadar Bazar is a bustling market located
                  1 km away from Paharganj. With over 40,000 wholesale shops, it
                  is one of the largest and most populated international
                  markets. Shoppers can find a wide range of products here,
                  including clothes, groceries, crockery, and gift items & More,
                  The market is constantly changing with the festivals, offering
                  special items such as Diwali goods, Holi flowers, tricolor,
                  kites, home decor items, Jhalar Ladies, lights, greeting
                  cards, Rakhi ki Rakhi during Rakhi days, and even Chunri and
                  accessories for parents during special occasions. With so many
                  options available.
                </div>
                <div className="placesToGo">
                  <b>Karol Bagh -</b> Karol Bagh is a neighborhood located in
                  the heart of Delhi, India. It is known for its shopping
                  streets and is considered one of the busiest commercial areas
                  in the city. Karol Bagh is also home to many street food
                  stalls and local markets, making it a popular tourist
                  destination for those looking for an authentic Delhi
                  experience.
                </div>
                <div className="placesToGo">
                  <b>Khari Baoli-</b> Khari Baoli is a historical street located
                  in Old Delhi, India, and is one of the largest wholesale spice
                  markets in Asia. The street dates back to the 17th century and
                  is lined with shops selling a variety of spices, dried fruits,
                  nuts, and other food items. Traders from all over the country
                  come to this market to purchase goods in bulk. The street is
                  also a popular tourist destination for those interested in
                  experiencing the vibrant and bustling atmosphere of Delhi's
                  traditional markets.
                </div>
                <div className="placesToGo">
                  <b>Desh Bandhu Gupta Road -</b> Desh Bandhu Gupta Road
                  provides a direct route to New Delhi Railway Station, enabling
                  travelers to catch trains from all over India in just 10
                  minutes. The surrounding area features a variety of
                  restaurants, hotels, and sightseeing attractions, as well as a
                  travel agency to accommodate any needs. 2 and 3 star hotels in
                  Paharganj also available at desh bandu gupta road. Business
                  hotels in paharganj are also located there.
                </div>
                <div className="placesToGo">
                  <b>Connaught Place-</b> Connaught Place is known for its
                  old-world charm, with the lights of the vintage buildings
                  providing a beautiful backdrop. This bustling area is a
                  popular hangout spot for locals, offering plenty of cafes,
                  bars, and wine shops to explore. Don't miss visiting Cha Bar
                  and Farzi Cafe for a wonderful evening experience. Not only do
                  they have delicious street food, but they also have a great
                  selection of drinks to enjoy. Make sure to visit Connaught
                  Place and experience its unique atmosphere
                </div>
                <div className="placesToGo">
                  <b>Janpath market -</b> This market is most popular for
                  decorating, antique, and crafted items than dresses, unlike
                  other markets in Delhi. It is stretched around the outer
                  circle of CP. It is popular among students and tourists alike.
                  Some good footwear shops are here. The only thing required
                  here is bargaining. The more you bargain the better price you
                  get for your desired product. You will get clothes from here
                  at a cheap price. This market is located in Connaught Place.
                  You can enjoy the beautiful view and do some shopping in
                  Janpath market.
                </div>
                <div className="locationSubHeading">
                  Best hotel in paharganj delhi -
                </div>
                <div className="placesToGo">
                  Paharganj is famous for the best hotels. There are huge choice
                  for Business hotels in paharganj There are a lot of
                  pocket-friendly hotels. You can stay there if you visit New
                  Delhi. Some of our metro Poli, Vivek hotels, and hotel Vishal
                  Avtaar are 2 to 3-star hotels in Paharganj, Available at good
                  price and nice view of paharganj. New Delhi. this road is
                  situated near New Delhi Railway Station it’s just 2.4km away
                  from New Delhi Railway. Arakashan Road in Paharganj is
                  considered to be the hub of hotels. It’s a Great choice for
                  those who are looking for pocket-friendly accommodation. Here
                  is a lot of a variety of good hotels weather it’s a Business
                  hotels in Paharganj or a couple of friendly hotels in
                  Paharganj. If you are coming for a business trip in Paharganj
                  you must book a hotel on Prakashan Road. As I already told you
                  it’s a hub of hotels, you can get a good hotel at the best
                  price and the best facility. Hotel Jyoti heritage by Staybook.
                  Jyoti Heritage by Staybook Is a heritage property this is the
                  best property in Pharganj which reminds you of the hotel of
                  Jaipur. It’s difficult to find such property in Paharganj near
                  New Delhi. Best location everything is near. You can book it
                  for shooting, if you are coming for a business trip and
                  looking for business hotels in Paharganj you must book, in
                  this hotel a conference room is also available for meeting
                  It’s located In Chuna mandi pahrganj Near New Delhi Here is
                  lot of budget and couple friendly hotels in Paharganj Delhi.
                  They all are budget friendly and pocket friendly. If you are
                  couple you can book hotels in Paharganj. Here is lot of
                  benefit to stay in paharganj the transportation is easy, easy
                  to transportation is easy. easy to catch the metro, located
                  just 10 minutes away from Paharganj, and also easily catch the
                  e-rikshaw from the road. Famous street food in Paharganj also
                  available around the corner of every street While the Nearsest
                  Metro Station is just 1.5km away from Arakasha road and the
                  New Delhi metro is also near. The Indra Gandhi Internation
                  Airport about 14.6km away The airport metro connects directly
                  to the nearby metro station of this place for a tourist it's
                  easy to come directly here. While ‘Main Bazar’ is a paradise
                  for those who love shopping and food. Best restaurant
                  available in Main Bazar. The Sambar near Arakashan Road
                  situated in Main Bazar is famous for delicious food and live
                  concert. You can enjoy it with your friends and family. The
                  road situated on the left side of the New Delhi Railway
                  Station is connected directly to Connaught place. The road's
                  name is Chelmsford road. It can be a good place for tourists
                  because whether it's New Delhi Railway Station or New Delhi
                  Metro station these two are near Arakshan road.
                </div>
                <div className="locationSubHeading">
                  Famous Temple near Paharganj -
                </div>
                <div className="placesToGo">
                  <b>Hanuman Temple-</b> Located in the heart of Karol Bagh,
                  just 1 km away from Paharganj and near Jhandewalan Metro
                  Station, stands the tallest Hanuman Ji statue in Delhi - a
                  majestic 108 ft tall monument that is a sight to behold. Its
                  grand gates adorned with lion-shaped sculptures draw visitors
                  from all over, who come to marvel at its grandeur and beauty.
                  Don't miss this awe-inspiring sight and come immerse yourself
                  in its spiritual atmosphere.
                </div>
                <div className="placesToGo">
                  <b>Jhandewalan Temple</b> -Jhandewalan Temple is a renowned
                  Hindu temple located just a short distance away. Its octagonal
                  structure is topped with a lotus-shaped leaf, and at the
                  bottom of the cave lies an ancient idol of the Mother. Behind
                  the idol is a Shivling, which was discovered during
                  excavations. This temple is a must-visit destination for
                  devotees of the Hindu faith.
                </div>
                <div className="placesToGo">
                  <b>Gurdwara Bangla Sahib -</b> Delhi's most renowned & most
                  visited Gurdwaras, located near Gol Market, just 1 km away
                  from Paharganj. Inside this majestic Gurdwara, you will find a
                  serene atmosphere of peace and tranquility. Take in the
                  beautiful recitation of Gurbani and find a sense of inner
                  harmony. Besides, there is a pond (Sarovar), where people can
                  take a dip in it to purify their souls. Come experience the
                  spiritual essence of this divine place and be filled with
                  peace.
                </div>
                <div className="placesToGo">
                  <b>Shri Luxmi Narayan Temple-</b> The famous Birla Mandir,
                  also known as the Temple of Lord Vishnu and Mata Lukmi, is a
                  grand Hindu temple located only 2 km away from Paharganj. It
                  is one of the largest Hindu temples in the city, renowned for
                  its exquisite architecture and intricate design. Here,
                  visitors can experience the serenity of the sacred space and
                  admire the beauty of the carvings. With its majestic splendor,
                  Birla Mandir is a place of peace and tranquillity that no one
                  should miss.The famous Birla Mandir, also known as the Temple
                  of Lord Vishnu and Mata Lukmi, is a grand Hindu temple located
                  only 2 km away from Paharganj. It is one of the largest Hindu
                  temples in the city, renowned for its exquisite architecture
                  and intricate design. Here, visitors can experience the
                  serenity of the sacred space and admire the beauty of the
                  carvings. With its majestic splendor, Birla Mandir is a place
                  of peace and tranquility that no one should miss.
                </div>
                <div className="placesToGo">
                  <b> Gurudwara Sis Ganj - </b>It is located in Chandni chowk,
                  the most religious place of Sikhs, their ninth Holy Guru Tegh
                  Bahadur martyr by The Mughal King Aurangzeb, where was
                  beheaded, where the Guru Dwara was built.
                </div>
                <div className="placesToGo">
                  <b>Gori Shankar Mandir-</b> Gori Shankar mandir is a renowned
                  Hindu temple located near Digambar ala mandir known for Lord
                  Shiva.
                </div>
                <div className="placesToGo"></div>
              </div>

              <button
                id="less3"
                className="locationLessButton"
                onClick={showLess("3")}
              >
                Read Less
              </button>
            </div>
          )}
          {/* {data!.name == "Hotels in South Delhi" && (
            <div>Hotels in South Delhi</div>
          )}
          {data!.name == "Hotels in Manali" && <div>Hotels in Manali</div>} */}
        </>
      )}
    </>
  );
}

export default Hotels;
