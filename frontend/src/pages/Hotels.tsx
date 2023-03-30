import React, { useState, useEffect } from 'react';
import '../styles/Hotel.scss';
import HotelCard,{Props}from '../components/HotelCard';
import { useParams } from 'react-router-dom';
import client from '../client';
import {Helmet} from 'react-helmet';
import Spinner from '../components/Spinner';

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
        setData(data[0])
      })
      .then(() => setIsLoading(false))
  }, [slug])

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

          {data!.name == "Hotels in Paharganj" && (
            <div className="aboutLocation">
              <h3 className="locationTitle">ABOUT PAHARGANJ</h3>
              <p className="locationDescription">
                Paharganj is a lively neighborhood in the heart of Delhi, famous
                for its affordability and abundance of experiences. Whether
                you're looking for a budget-friendly hotel room, street food,
                restaurants, or a wide variety of shops for both domestic and
                international travelers, you'll find it all in Paharganj. With
                interconnected roads such as Sadar Bazar, Main Bazar, Connaught
                Palace, and Karol bagh, you can easily navigate the area and
                take advantage of the plentiful options of hotels, lodges,
                restaurants, and shops - all within close proximity. Come
                explore and experience yourself the wonders of Paharganj. Delhi
                Paharganj is a budget-friendly destination that attracts
                travelers from all over the world. Whether you are on a budget
                or not, there is a hotel in Paharganj for you
              </p>

              <button
                id="more3"
                className="locationMoreButton"
                onClick={showMore("3")}
              >
                Read More
              </button>

              <div id="text3" style={{ display: "none" }} className="readMore">
                A visit here is sure to be a memorable experience for first-time
                travelers. Boasting a vibrant atmosphere and a wide range of
                street food and shopping opportunities, the area is full of life
                and beauty. Furthermore, 24/7 food availability ensures that
                visitors can enjoy local taste at any time. For added peace of
                mind, the area is monitored by CCTV surveillance provided by the
                New Delhi police for crime prevention.
                <div className="locationSubHeading">
                  Some famous shops in Paharganj-
                </div>
                <div className="placesToGo">
                  <b>Bikaner Sweets Corner - </b>Discover Bikaner famous sweet
                  shop, located right in the heart of Paharganj! Offering a wide
                  variety of delicious sweets and snacks at very reasonable
                  prices, Bikaner Sweets corner has something for everyone.
                  Enjoy Bikaner's famous Sohan Halwa, Royal Anjeer Barfi,
                  Khajoor Barfi, and more. Or, try out some of the delicious
                  snacks like Chow Mein Samosa, Paneer ka Pakoda, Aloo Samosa,
                  and more - all available here. Plus, it is open from 8 am to
                  11 pm, for your convenience. Stop by Bikaner's famous sweet
                  shop today and find out why it's so popular in this area!
                </div>
                <div className="placesToGo">
                  Chawla de chur-chur naan - Chawla de chur-chur naan is
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
                  Paharganj is the perfect place to spend an afternoon. This
                  restaurant is Situated in Paharganj Chuna Mandi, The Heart Of
                  Paharganj. Just near The Railway Station of New Delhi and just
                  1.3km away from Connaught place It is one of the most famous
                  shops and if you are staying near the Railway Station In
                  Delhi, you must try it. Chole Bhature is very delicious.
                  Located in Paharganj you can easily reach out to this place
                  since anyone in that area is pretty familiar with this shop.
                  This is very close to the imperial cinema. They also provide
                  home delivery. You can order online through zomato.com and
                  swiggy.com for the menu you can visit their official sites -
                  Menu:
                  <a
                    style={{ color: "blue" }}
                    target="_blank"
                    href="https://sitaramdiwanchand.co.in/"
                  >
                    sitaramdiwanchand.co.in
                  </a>
                  Address: 2243, Rajguru Marg, Chuna Mandi, Paharganj, New
                  Delhi, Delhi 110055
                </div>
                <div className="placesToGo">
                  <b>Multan Moth Bhandar Kachori -</b> One of the best kachoris
                  I have tasted. The accompaniment to the kachoris was unique as
                  it contained cooked rice. For Rs 40/- two kachoris with moth
                  daal accompaniment are very cheap. Do try and visit the shop
                  whenever in Paharganj. It is very close to Bikaner Sweet Shop.
                  The kachoris and their accompaniments are served on leaves
                  which are disposed of in an eco-friendly manner. It's located
                  at Paharganj Gali no 6 Multani Dhandha near Modi Opticals.
                </div>
                <div className="placesToGo">
                  <b>Darbar Restaurant - </b>Experience the amazing taste of
                  delicious food from all around the world at the famous Darbar
                  Restaurant in Paharganj! Located right in front of the famous
                  Bikaner sweet shop, this restaurant serves a wide variety of
                  Indian, South Indian, and Chinese dishes. Not only is the food
                  here mouth-wateringly delicious, but it is also prepared with
                  utmost care and hygiene, ensuring that you and your family can
                  enjoy a meal without any health concerns. Don't wait any
                  longer - visit Darbar Restaurant today and enjoy a delicious
                  feast!
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
                <div>Here are some interesting facts about Karol Bagh: </div>
                <ul>
                  <li>
                    It is one of the largest wholesale marketplaces in Delhi and
                    is famous for its textiles and jewelry shops.
                  </li>
                  <li>
                    Karol Bagh is named after Saint Karol Jaspal Singh, who
                    lived and preached in the area during the 1940s.
                  </li>
                  <li>
                    Karol Bagh is known for its street food, including the
                    popular "chaat" dishes, and is a popular place for foodies.
                  </li>
                  <li>
                    It is also home to several budget hotels, making it a
                    popular choice for travelers looking for affordable
                    accommodations in Delhi. The neighborhood is located near
                    the Karol Bagh metro station, which provides easy access to
                    other parts of Delhi.
                  </li>
                </ul>
                <div className="placesToGo">
                  <b>Khari Baoli-</b> Khari Baoli is a historical street located
                  in Old Delhi, India, and is one of the largest wholesale spice
                  markets in Asia. The street dates back to the 17th century and
                  is lined with shops selling a variety of spices, dried fruits,
                  nuts, and other food items. Traders from all over the country
                  come to this market to purchase goods in bulk. The street is
                  also a popular tourist destination for those interested in
                  experiencing the vibrant and bustling atmosphere of Delhi's
                  traditional markets. Despite its historical significance and
                  bustling atmosphere, Khari Baoli still serves as a hub for the
                  spice trade and continues to be a hub of commerce and activity
                  in modern-day Delhi.
                </div>
                <div className="placesToGo">
                  <b>Timber Market-</b> Looking for quality wood pieces for your
                  next project? Look no further than Paharganj! This area is
                  home to a number of wood shops offering boards of all shapes,
                  sizes, and designs. Whether you're looking for plywood doors,
                  adhesives, wood moldings, or PVC sheets, you'll be sure to
                  find what you need at Kapoor Timber Stores or North India
                  Timber Supply. With their competitive prices and wide
                  selection, you can rest assured that you'll get the best
                  quality materials for your project. Shop today and get your
                  hands on the perfect wood pieces for your project!
                </div>
                <div className="placesToGo">
                  <b>Furniture Market -</b> Come to Paharganj Multani Dhanda and
                  find an amazing selection of chairs and tables of all types!
                  Whether you're after plastic or steel chairs, we've got
                  something to suit your needs and budget. With so many choices
                  available, you're sure to find the perfect chair for you.
                  Don't wait - come and explore our selection today!
                </div>
                <div className="placesToGo">
                  <b>Plastic Market -</b> It is also famous for plastic acrylic
                  sheets, vinyl, led, electric board and PVC sheets, Boards with
                  lights are also made here, you can get them made of your
                  choice or you can get them made with the name of your shop and
                  shakti plastic and kapoor plastic shop is very famous.
                </div>
                <div className="placesToGo">
                  <b>Bag market-</b> This bag market is spread over a very large
                  area, which is in Singhara Chowk, this Nabi Karim market is
                  the largest wholesale market in Asia. People come from all
                  over here to buy designer bags, and from here you can buy
                  goods in bulk. You can buy a variety of handbags, backpacks,
                  School bags, pouches, trolleys, leather suitcases, fancy
                  packs, and more from here. This is a very big market, there
                  are many outlets here which give very good brand bags which
                  last for a very long time and You can buy bags very cheap from
                  here. There is so much variety here that you cannot find it
                  anywhere in Delhi. There are lots of outlets open at 9 am and
                  close at 7 pm, between which you can shop whenever you want.
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
                  Place and experience its unique atmosphere. The famous Central
                  park is also there. It's famous for beautiful evenings located
                  at Connaught place just across from the Rajiv chowk metro
                  station. People come here with their families and friends.
                  Many cultural and musical events are organized here, and the
                  added attraction is the Indian flag. A good place to hang out
                  for a couple of hours.
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
                  <b>Jhandewalan Temple</b> - Jhandewalan Temple is a renowned
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
                  serene atmosphere of peace and tranquillity. Take in the
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
                  should miss.
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
      ;
    </>
  );
};
  
export default Hotels
