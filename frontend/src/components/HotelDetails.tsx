import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import PlaceIcon from "@mui/icons-material/Place";
import "../styles/HotelDetails.scss";

const HotelDetails = (props: any) => {
  let hotel = props.hotel;
  let amenities: string[] = hotel.hotel_amenities;
  let chunkSize: number = Math.max(1, Math.ceil(amenities.length / 3));
  let amenityArray1: string[] = amenities.slice(0, chunkSize);
  let amenityArray2: string[] = amenities.slice(chunkSize, 2 * chunkSize);
  let amenityArray3: string[] = amenities.slice(2 * chunkSize);
  let nearbyPlaces: { nearby_place_name: string, nearby_place_link: string }[] = hotel.hotel_nearby_places;

  let places: {
    a: { name: string; link: string };
    b: { name: string; link: string };
  }[] = [];

  if (hotel.name == "Staybook Hotel Pinky Villa") {
    let allPlaces = [
      "Connaught Place 1.9 km",
      "Indira Gandhi International Airport 13.5 km",
      "New Delhi Railway Station 1.2 Km",
      "Lal Quila 4.7 Km",
      "Sadar Bazar 2.2 Km",
      "Karol Bagh 1.4 km",
      "RK Ashram Metro Station 1 km",
      "Jhandewalan Temple 1.8 Km",
      "National Gandhi Museum 4.0 km",
      "Raj Ghat 4.3 km",
      "India Gate 5.0 km",
      "Lodhi Garden 6.7 km",
      "Humayun Tomb 8.0 km",
      "Qutub Minar 15.8 Km",
      "Lotus Temple 15.4 km",
      "Iskcon Temple 14.3 km",
      "New Delhi Metro Station 1.5 Km",
      "Hauz Khas 13.2 Km",
      "Church 3.2 Km",
      "Akshardham Mandir 12.3 km",
      "Science Museum 8.1 km",
      "Lajpat Nagar 12.2 km",
      "Kamla Nagar 6.5 Km",
      "Talkatora Park 3.9 Km",
      "Janpath Market 3.4 km",
      "Jantar Mantar 3.1 km",
      "Bangla Sahib Gurdwara 3.2 km",
      "Chhatarpur Mandir 19.0 Km",
      "Chandni Chowk 3.1 Km",
      "Chawri Bazar 1.9 Km",
      "Palika Bazar 2.8 Km",
      "Sarojini Nagar 12.9 Km",
      "Laxmi Nagar Market 9.3 Km",
      "Shish Ganj Gurdwara 3.1 km",
      "National Crafts Museum 6.5 Km",
      "Adventure Ice Land 16.5 km",
    ];

    let nearLinks = [
      "https://goo.gl/maps/naWwQ5HphoWsL42p6",
      "https://goo.gl/maps/SButfRteZ8QYfJjQ7",
      "https://goo.gl/maps/6L41zJtH6Vq3eXDX6",
      "https://goo.gl/maps/TyCYGmhEw1Dk4zkk9",
      "https://goo.gl/maps/YQELLhHRrGYMvFaPA",
      "https://goo.gl/maps/vEWbG7QU4HhpLZaj7",
      "https://goo.gl/maps/EbdapVHYACCHEcXz6",
      "https://goo.gl/maps/whNT4euDdMcizQvH6",
      "https://goo.gl/maps/TAbf8ccE46NQS6tC7",
      "https://goo.gl/maps/huwnSNUUXPTcLbZW9",
      "https://goo.gl/maps/5i9vtR9FH76eGsp19",
      "https://goo.gl/maps/4LB46F1TPHWnYeNz9",
      "https://goo.gl/maps/RrcpkTpj52uz7xsq9",
      "https://goo.gl/maps/cmryuodph4PnLr1RA",
      "https://goo.gl/maps/YrRfZqNWFLUqp5vs9",
      "https://goo.gl/maps/aPorZPQfm4YsivgPA",
      "https://goo.gl/maps/BZousng4VBDUKEno6",
      "https://goo.gl/maps/sdWJwuDGK7Yp5YEw5",
      "https://goo.gl/maps/tyDqf5G5d6K68ncu8",
      "https://goo.gl/maps/hcRyaqg4a32GKme36",
      "https://goo.gl/maps/TMfmQ4eACeA2366G6",
      "https://goo.gl/maps/PRLe8Fi777MqhbGB6",
      "https://goo.gl/maps/ggWzy8udJY2QscJx8",
      "https://goo.gl/maps/CN5UpyJyurf2WN4b7",
      "https://goo.gl/maps/YEFJyqY5xAsd41kM6",
      "https://goo.gl/maps/tPmL5VPgysVoPfnM8",
      "https://goo.gl/maps/WFjsECfkMW3WVJYg6",
      "https://goo.gl/maps/Nffjy9Htximq35tW8",
      "https://goo.gl/maps/ynKTyCmmxo2oZG3k8",
      "https://goo.gl/maps/GLgqtDAkznbYA3TP6",
      "https://goo.gl/maps/mCoxqQSaLvBRj8fF8",
      "https://goo.gl/maps/nHRaqsipGycpQfYL9",
      "https://goo.gl/maps/ap6KCBhf4PKKCt6b9",
      "https://goo.gl/maps/grmUWSLjBgHeJNMi9",
      "https://goo.gl/maps/baSdSFujmrgfbrzTA",
      "https://goo.gl/maps/QWbbRf63AMJ1duBv9",
    ];
    nearbyPlaces = [];
    for (let i = 0; i < allPlaces.length; i++) {
      nearbyPlaces.push({
        nearby_place_name: allPlaces[i],
        nearby_place_link: nearLinks[i],
      });
    }
  } else {
    // let nearbyPlaces: { nearby_place_name: string, nearby_place_link: string }[] = hotel.hotel_nearby_places;
  }
  if (nearbyPlaces) {
    for (let i = 0; i < nearbyPlaces.length; i += 2) {
      places.push({
        a: {
          name: nearbyPlaces[i].nearby_place_name,
          link: nearbyPlaces[i].nearby_place_link,
        },
        b: {
          name:
            i + 1 < nearbyPlaces.length
              ? nearbyPlaces[i + 1].nearby_place_name
              : "",
          link:
            i + 1 < nearbyPlaces.length
              ? nearbyPlaces[i + 1].nearby_place_link
              : "",
        },
      });
    }
  }

  return (
    <div className="hoteldetails">
      {hotel.hotel_description.map((desc: string) => {
        let boldIndex = desc.indexOf("-");
        if (boldIndex != -1) {
          return (
            <p>
              <b>{desc.substring(0, boldIndex)}</b> {desc.substring(boldIndex)}
            </p>
          );
        }

        return <p>{desc}</p>;
      })}
      <h2>Hotel Amenities</h2>
      <div className="hotel-amenities">
        <div>
          {amenityArray1.map((amenity: string) => (
            <p className="icontext">
              <CheckIcon fontSize="inherit" /> {amenity}
            </p>
          ))}
        </div>
        <div>
          {amenityArray2.map((amenity: string) => (
            <p className="icontext">
              <CheckIcon fontSize="inherit" /> {amenity}
            </p>
          ))}
        </div>
        <div>
          {amenityArray3.map((amenity: string) => (
            <p className="icontext">
              <CheckIcon fontSize="inherit" /> {amenity}
            </p>
          ))}
        </div>
      </div>
      {nearbyPlaces && <h2>Nearby Places</h2>}

      {nearbyPlaces &&
        places.map((place: any) => (
          <div className="hotel-nearby-places">
            {place.a.name && (
              <a href={place.a.link} target="_blank">
                <p className="icontext">
                  <PlaceIcon fontSize="inherit" />
                  {place.a.name}
                </p>
              </a>
            )}
            {place.b.name && (
              <a href={place.b.link} target="_blank">
                <p className="icontext">
                  <PlaceIcon fontSize="inherit" />
                  {place.b.name}
                </p>
              </a>
            )}
          </div>
        ))}
    </div>
  );
};

export default HotelDetails;
