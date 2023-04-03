import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PlaceIcon from '@mui/icons-material/Place';
import '../styles/HotelDetails.scss'

const HotelDetails = (props: any) => {
  let hotel = props.hotel;
  let amenities: string[] = hotel.hotel_amenities;
  let chunkSize: number = Math.max(1, Math.ceil(amenities.length / 3));
  let amenityArray1: string[] = amenities.slice(0, chunkSize);
  let amenityArray2: string[] = amenities.slice(chunkSize, 2 * chunkSize);
  let amenityArray3: string[] = amenities.slice(2 * chunkSize);
  let nearbyPlaces: { nearby_place_name: string; nearby_place_link: string }[] =
    hotel.hotel_nearby_places;

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
  } else if (hotel.name == "Staybook Jyoti Mahal A Heritage Hotel") {
    let allPlaces = [
      "New Delhi Railway Station 1.2 Km",
      "Connaught palace 1.9 km",
      "New Delhi Metro Railway Station 1 Km",
      "Lal Quila 4.7 Km",
      "Sadar Bazar 2.2 Km",
      "Karol Bagh 1.4 km",
      "RK Ashram Metro Station 500 meters",
      "Jama Masjid 2.8 km",
      "Jhandewalan Temple 1.9 km",
      "National Gandhi Museum 4.0 km",
      "Raj Ghat 4.4 km",
      "India Gate 5.0 km",
      "Indira Gandhi International Airport 13.5 Km",
      "Humayun Tomb 8.0 Km",
      "Qutub Minar 15.8 Km",
      "Jantar Mantar 2.5 km",
      "Iskcon Temple 14.3 km",
      "New Delhi Metro Station 1.5 Km",
      "Hauz Khas 13.2 Km",
      "Adventure Ice Land 16.5 Km",
      "Talkatora Park 3.9 Km",
      "Janpath Market 3.4 Km",
      "Lotus Temple 15.4 km",
      "Firoz shah kotla 5.6 Km",
      "Bangla Sahib Gurdwara 3.2 Km",
      "Chandni Chowk 3.1 Km",
      "Chawri Bazar 1.9 Km",
      "Lodhi Garden 6.7 Km",
      "Sarojini Nagar 12.9 Km",
      "Laxmi Nagar Market 9.3 Km",
      "Delhi Haat INA 13.2 Km",
      "Shish Ganj Gurdwara 3.1 Km",
      "National Crafts Museum 6.5 Km",
      "Kamla Nagar 6.5 Km",
      "Old Delhi 3.2 Km",
      "Meena Bazar 4 Km",
      "Jantar Mantar 2.5 Km",
      "Tank Road 4.0 Km",
      "Science Museum 8.1 Km",
      "Hazrat Nizamuddin 12.2 Km",
      "Champa Kali 17.4 Km",
      "Chhatarpur Mandir 19.0 Km",
    ];

    let nearLinks = [
      "https://goo.gl/maps/6L41zJtH6Vq3eXDX6",
      "https://goo.gl/maps/naWwQ5HphoWsL42p6",
      "https://goo.gl/maps/N66QaVqgbDtic3dT6",
      "https://goo.gl/maps/TyCYGmhEw1Dk4zkk9",
      "https://goo.gl/maps/YQELLhHRrGYMvFaPA",
      "https://goo.gl/maps/VSWHwbYkbsMEvwzy9",
      "https://goo.gl/maps/m41PBEsY6jCY7ZVH8",
      "https://goo.gl/maps/kyckfvHc72rGesZG6",
      "https://goo.gl/maps/LQUE7vqx4Xa1r7Q88",
      "https://goo.gl/maps/LMdmiFAMmF5Tch6j8",
      "https://goo.gl/maps/xYXp7F9EDcyqdLFJ9",
      "https://goo.gl/maps/5hnz89FwPSLi6QVV9",
      "https://goo.gl/maps/SButfRteZ8QYfJjQ7",
      "https://goo.gl/maps/53NZ2bSwwCzDSpNaA",
      "https://goo.gl/maps/MVgoCKqnpbyaUN3m9",
      "https://goo.gl/maps/GDThw1oTSctyDHycA",
      "https://goo.gl/maps/RpXrrodF6nKcZnUt5",
      "https://goo.gl/maps/bF5t7r44rNj7L59S8",
      "https://goo.gl/maps/Uyvh8fGZU7849bhbA",
      "https://goo.gl/maps/oikRYRWpT5cobxvA9",
      "https://goo.gl/maps/72SAJBPVeXrwiido6",
      "https://goo.gl/maps/6wqXh1B9y6s9jYYD9",
      "https://goo.gl/maps/dkSrUUMXTiRP7UjM9",
      "https://goo.gl/maps/wwemN8GVkbTZcXiJ8",
      "https://goo.gl/maps/pZuuDKoXdNAVoA468",
      "https://goo.gl/maps/aHzBw79xEA8QJNRN7",
      "https://goo.gl/maps/Bd3kTsw3kdSZUV1F8",
      "https://goo.gl/maps/1nk9PTx6Jhwdntez6",
      "https://goo.gl/maps/nHRaqsipGycpQfYL9",
      "https://goo.gl/maps/N35L6JUFKwngWVis5",
      "https://goo.gl/maps/Qfmm7J7T3BPN4C456",
      "https://goo.gl/maps/Du9Sn4xHL3j9UtLB9",
      "https://goo.gl/maps/baSdSFujmrgfbrzTA",
      "https://goo.gl/maps/TZgqFuPFeoc4hqfs6",
      "https://goo.gl/maps/VCw9uUoQHNnhVSUG7",
      "https://goo.gl/maps/7D9fnYKjHdrnAteMA",
      "https://goo.gl/maps/GDThw1oTSctyDHycA",
      "https://goo.gl/maps/ZpDpgUVrr3ziXKbx5",
      "https://goo.gl/maps/fQErWWaXBg1Z3cPP7",
      "https://goo.gl/maps/NEsT365qD51hvwQu9",
      "https://goo.gl/maps/R46BYQte3xSaAhUK9",
      "https://goo.gl/maps/aHzBw79xEA8QJNRN7",
    ];

    nearbyPlaces = [];
    for (let i = 0; i < allPlaces.length; i++) {
      nearbyPlaces.push({
        nearby_place_name: allPlaces[i],
        nearby_place_link: nearLinks[i],
      });
    }
  } else if (hotel.name == "Hotel Aira Xing by Staybook") {
    let allPlaces = [
      "RK Ashram Metro Station 1.6 Km",
      "New Delhi Metro Station 2.6 Km",
      "New Delhi Railway Station 2.0 Km",
      "Jhandewalan Temple 1.1 km",
      "Sadar Bazar 1 km",
      "Karol Bagh 2.3 km",
      "Connaught Place 3.7 km",
      "Jama Masjid 3.5 km",
      "Lal Quila 5.5 km",
      "National Gandhi Museum 4.7 km",
      "Raj Ghat 5.1 km",
      "India Gate 5.9 km",
      "Lodhi Garden 7.7 km",
      "Humayun Tomb 8.9 km",
      "Qutub Minar 17.1 km",
      "Lotus Temple 14.5 km",
      "Iskcon Temple 15.2 km",
      "Indira Gandhi International Airport 13.8 km",
      "Hauz Khas 14.5 km",
      "Swaminarayan Akshardham 10.9 km",
      "Chhatarpur Mandir 20.5 km",
      "Science Museum 7.1 Km",
      "Jantar Mantar 4.6 Km",
      "Talkatora Park 3.4 Km",
      "Janpath Market 3.9 Km",
      "National Crafts Museum 6.5 Km",
      "Five Sense Park 19.0 Km",
      "Hauz Khas 15.9 Km",
      "Bangla Sahib Gurdwara 4.5 Km",
      "Chandni Chowk 3.3 km",
      "Chawri Bazar 3.1 km",
      "Palika Bazar 3.2 Km",
      "Sarojini Nagar 11.4 Km",
      "Hanuman Mandir 2.3 km",
      "Church 4.5 km",
      "Shish Ganj Gurdwara 4.3 Km",
      "Delhi Haat INA 10.8 Km",
      "Humayun’s Tomb 8.9 km",
      "Old Delhi 5.4 Km",
      "Meena Bazar 4.4 km",
      "Hazrat Nizamuddin 10.7 Km",
      "Worlds of wonder 19.3 Km",
      "Birla Mandir 2.3 Km",
      "Tank Road 3.4 Km",
    ];

    let nearLinks = [
      "https://goo.gl/maps/xH36qReGVra233GE9",
      "https://goo.gl/maps/b9J9H8RfuKgFsJiq8",
      "https://goo.gl/maps/6L41zJtH6Vq3eXDX6",
      "https://goo.gl/maps/LQUE7vqx4Xa1r7Q88",
      "https://goo.gl/maps/YQELLhHRrGYMvFaPA",
      "https://goo.gl/maps/VSWHwbYkbsMEvwzy9",
      "https://goo.gl/maps/naWwQ5HphoWsL42p6",
      "https://goo.gl/maps/6xmZndhBHXYQztpX7",
      "https://goo.gl/maps/TyCYGmhEw1Dk4zkk9",
      "https://goo.gl/maps/LMdmiFAMmF5Tch6j8",
      "https://goo.gl/maps/xYXp7F9EDcyqdLFJ9",
      "https://goo.gl/maps/87HiXqvQ4gR4H6gAA",
      "https://goo.gl/maps/1nk9PTx6Jhwdntez6",
      "https://goo.gl/maps/53NZ2bSwwCzDSpNaA",
      "https://goo.gl/maps/MVgoCKqnpbyaUN3m9",
      "https://goo.gl/maps/dkSrUUMXTiRP7UjM9",
      "https://goo.gl/maps/SqRfhac1QMeDVQZ56",
      "https://goo.gl/maps/SButfRteZ8QYfJjQ7",
      "https://goo.gl/maps/Uyvh8fGZU7849bhbA",
      "https://goo.gl/maps/nxSSUPeFi68dWfvX8",
      "https://goo.gl/maps/aEvtE8B2actzFf4u6",
      "https://goo.gl/maps/YSRm185MLtkQVEyTA",
      "https://goo.gl/maps/GDThw1oTSctyDHycA",
      "https://goo.gl/maps/nZJN41TzZLBpnH888",
      "https://goo.gl/maps/6wqXh1B9y6s9jYYD9",
      "https://goo.gl/maps/6u8ZdHptFc5iKVvW8",
      "https://goo.gl/maps/iUKurgutpo6aSm2FA",
      "https://goo.gl/maps/Uyvh8fGZU7849bhbA",
      "https://goo.gl/maps/a1FC4BgqWRWhcZz27",
      "https://goo.gl/maps/7mGwaaytqTVj321v6",
      "",
      "https://goo.gl/maps/xQ6nG679SuRPfxX18",
      "https://goo.gl/maps/GRL35QXxZtTXSZY69",
      "https://goo.gl/maps/U365ovv2LaXMJkL67",
      "https://goo.gl/maps/4BfruLyEG87mMjXV9",
      "https://goo.gl/maps/TpyHHrFguojekTMk6",
      "https://goo.gl/maps/Li3a9frsrW1BxTbK6",
      "https://goo.gl/maps/53NZ2bSwwCzDSpNaA",
      "https://goo.gl/maps/VCw9uUoQHNnhVSUG7",
      "https://goo.gl/maps/SgCjHF9ZKDsDCCuq6",
      "https://goo.gl/maps/YRBgoG3Xnrnaoa1C8",
      "https://goo.gl/maps/Tfj6okbEjbht19cVA",
      "https://goo.gl/maps/FRxjCNebrGBYvWyd9",
      "https://goo.gl/maps/XuvuRv6UcUuKknAm9",
    ];
    nearbyPlaces = [];
    for (let i = 0; i < allPlaces.length; i++) {
      nearbyPlaces.push({
        nearby_place_name: allPlaces[i],
        nearby_place_link: nearLinks[i],
      });
    }
  } else if (hotel.name == "Staybook Atlanta New Delhi Train Station") {
    let allPlaces = [
      "RK Ashram Metro Station 750 mtr",
      "New Delhi Metro Station 800 mtr",
      "New Delhi Railway Station 900 mtr",
      "National Gandhi Museum 3.6 km",
      "Sadar Bazar 1 km",
      "Karol Bagh 1.4 km",
      "Connaught Place 2.0 km",
      "Bangla Sahib Gurdwara 3.2 km",
      "Lal Quila 3.0 km",
      "Jhandewalan Temple 900 mtr",
      "Raj Ghat 4.1 km",
      "India Gate 4.2 km",
      "Lodhi Garden 6 km",
      "Humayun Tomb 7 km",
      "Qutub Minar 17.8 km",
      "National Crafts Museum 6.5Km",
      "Iskcon Temple 15 km",
      "Indira Gandhi International Airport 17 km",
      "Hauz Khas 12.4 Km",
      "Church 3.2 Km",
      "Akshardham Mandir 12.3 km",
      "Hanuman Mandir 2.5 km",
      "Talkatora Park 3.9 km",
      "Janpath Market 3.4 km",
      "Lajpat Nagar 12.2 km",
      "Five Sense Park 17.8 Km",
      "Chhatarpur Mandir 19.0 Km",
      "Birla Mandir 3.6 Km",
      "Chawri Bazar 1.9 Km",
      "Palika Bazar 2.8 Km",
      "Sarojini Nagar 12.9 Km",
      "Laxmi Nagar Market 9.3 km",
      "Delhi Haat INA 13.2 km",
      "Shish Ganj Gurdwara 3.1 km",
      "Lotus Temple 12 km",
      "Adventure Ice Land 16.5 Km",
      "Old Delhi 3.2 Km",
      "Meena Bazar 4 Km",
      "Hazrat Nizamuddin 10.4 km",
      "Champa Kali 17.4 km",
      "Chandni Chowk 3.1 km",
    ];

    let nearLinks = [
      "https://goo.gl/maps/3vhkM8XeM9GqzxWX9",
      "https://goo.gl/maps/fqUZ7kKaonESWPcQA",
      "https://goo.gl/maps/SUki869diE6H7Xf47",
      "https://goo.gl/maps/RDEb1AQHHuSc56zT9",
      "https://goo.gl/maps/VouqisrbcA59bYoQ7",
      "https://goo.gl/maps/3FUhS93DDas2vfcw6",
      "https://goo.gl/maps/3iTgGK41R7n8okKW9",
      "https://goo.gl/maps/YcRf4Gg8Wpidctdc6",
      "https://goo.gl/maps/YcRf4Gg8Wpidctdc6",
      "https://goo.gl/maps/qHw1Jt3SjAynEoHn6",
      "https://goo.gl/maps/wToiLYkCQZwWSckT7",
      "https://goo.gl/maps/5hnz89FwPSLi6QVV9",
      "https://goo.gl/maps/KbsT6aZBqcBNgLje8",
      "https://goo.gl/maps/b8Rcb1U8MuG2pVeL6",
      "https://goo.gl/maps/CNwKkmvDCe8RG5do6",
      "https://goo.gl/maps/baSdSFujmrgfbrzTA",
      "https://goo.gl/maps/M16hHBjz7oKo3AE6A",
      "https://goo.gl/maps/piq79WPyQ9TRYdS89",
      "https://goo.gl/maps/8Hbf761LbNzNZNsa6",
      "https://goo.gl/maps/auhZDe8eT8fTfik98",
      "https://goo.gl/maps/78S2t9BU39MMqhyU6",
      "https://goo.gl/maps/GsMkp1cB6VX3teej8",
      "https://goo.gl/maps/jE4xuJ9uWrQiqGTw8",
      "https://goo.gl/maps/KqnmFEnoGh96QyHu7",
      "https://goo.gl/maps/i14qV8hL65hwbyxY7",
      "https://goo.gl/maps/3FMPsSYCYK6tW9ZA9",
      "https://goo.gl/maps/9phHTVoZtzBHhp7v9",
      "https://goo.gl/maps/1BQHWFg8K9PsvB7C7",
      "https://goo.gl/maps/Jg7i6qWnR4bDsqpA9",
      "https://goo.gl/maps/Qnq3LpECbutLRxqC9",
      "https://goo.gl/maps/SzbkGYbMLxWpgoKZ7",
      "https://goo.gl/maps/JRVERwdLS3brmdQX7",
      "https://goo.gl/maps/NePBgmp9ZWfSzfc6A",
      "https://goo.gl/maps/b9GXT8EgrNfKDo246",
      "https://goo.gl/maps/S32XzwEfxgDpafep8",
      "https://goo.gl/maps/7bvgJ4Dv8Kx4oP1C6",
      "https://goo.gl/maps/cpm9LT437xCCubto9",
      "https://goo.gl/maps/5UTZjsgbAFBa1zSE7",
      "https://goo.gl/maps/cbyqX4hGTGyrLiir6",
      "https://goo.gl/maps/83iEtyDeoSzzVdNC7",
      "https://goo.gl/maps/dZykgKLCCtzHKwjS7",
    ];
    nearbyPlaces = [];
    for (let i = 0; i < allPlaces.length; i++) {
      nearbyPlaces.push({
        nearby_place_name: allPlaces[i],
        nearby_place_link: nearLinks[i],
      });
    }
  } else if (
    hotel.name == "Staybook Hotel Jai Balaji New Delhi  Train Station"
  ) {
    let allPlaces = [
      "Sadar Bazar 450 Mtr",
      "Shish Ganj Gurdwara 800 Mtr",
      "Karol Bagh 850 Mtr",
      "New Delhi Railway Station 1 Km",
      "Jhandewalan Temple 1.1 Km",
      "New Delhi Metro Station 1.3 Km",
      "Connaught Place 2.7 km",
      "Jama Masjid 7.5 km",
      "Lal Quila 6.6 km",
      "National Gandhi Museum 4.9 km",
      "Raj Ghat 5.0 km",
      "India Gate 5.5 km",
      "Lodhi Garden 9.5 Km",
      "Humayun Tomb 10.3 km",
      "Lotus Temple 4.8 km",
      "Iskcon Temple 17 km",
      "Indira Gandhi International Airport 19.6 km",
      "Qutub Minar 20.1 km",
      "Hauz Khas 11.5 Km",
      "Lodhi Art District 14.5 km",
      "Chattarpur Mandir 25.4 km",
      "Jantar Mantar 3.3 Km",
      "Talkatora Park 4.0 km",
      "Janpath Market 2.9 Km",
      "Rail Museum 13.9 Km",
      "Five Sense Park 22.0 Km",
      "Akashdham Mandir 2.6 km",
      "Chandni Chowk 3.1 Km",
      "Palika Bazar 2.8 Km",
      "Chawri Bazar 8.2 Km",
      "Khan Market 9.3 km",
      "Snow World 10.4 Km",
      "Sarojini Nagar 10.8 km",
      "Delhi Haat INA13.8 km",
      "DLF cyber hub 5.8 Km",
      "Waste to wonder park 6.1 Km",
      "Old Delhi 1.7 Km",
      "Meena bazar 4.5 km",
      "Hazrat Nizamuddin 10 km",
      "Church 4.6 Km",
      "Birla Mandir 2.3 Km",
    ];

    let nearLinks = [
      "https://goo.gl/maps/ahAWzfnBVy2cQ7A69",
      "https://goo.gl/maps/wTeWsV2M4hnQYLrXA",
      "https://goo.gl/maps/ck9XQ3U39km261Lh6",
      "https://goo.gl/maps/1Rc6u45gxvWgYmVg8",
      "https://goo.gl/maps/dJpedA4qawV6X7nC8",
      "https://goo.gl/maps/YLHxLkBiPAFBpsS99",
      "https://goo.gl/maps/XvwqKPSVjN2s5GHL6",
      "https://goo.gl/maps/GHWzu3EzgA7S46sR6",
      "https://goo.gl/maps/EtM79FwA75uN4WHJA",
      "https://goo.gl/maps/aJ21wrnV4i6iNSLW7",
      "https://goo.gl/maps/rAKojQYMy2nDunfJ6",
      "https://goo.gl/maps/VCXWGy5DTbvKdSRt9",
      "https://goo.gl/maps/xKRgvSmVbeEdqabH7",
      "https://goo.gl/maps/yrxmaNk9fGDCz2ZA7",
      "https://goo.gl/maps/Ltrs3V3hb1AM5GmN8",
      "https://goo.gl/maps/6rWkqxTEHEyaCmWN8",
      "https://goo.gl/maps/NhFJULNFXBtiLLVk7",
      "https://goo.gl/maps/1z4PdAXG46FjScdb8",
      "https://goo.gl/maps/68wcqBosyamMLx4t9",
      "https://goo.gl/maps/vyc4bbAYnCwmiDKGA",
      "https://goo.gl/maps/GYw7jKozE4rwLb1N7",
      "https://goo.gl/maps/9FQ9rbqxD5T1Vhrx6",
      "https://goo.gl/maps/L1VT9z6Acpihx2c18",
      "https://goo.gl/maps/UdWKFdW5tLALJq9i9",
      "https://goo.gl/maps/J968mPv9fTYyVXAs5",
      "https://goo.gl/maps/CSAztcTTWMLjyfP69",
      "https://goo.gl/maps/bDd5Zk18LvghGFqYA",
      "https://goo.gl/maps/tvWMLgEcvYBWmv3W8",
      "https://goo.gl/maps/iZYEfjhLkaE7KSK97",
      "https://goo.gl/maps/6Logtbd6wRshj1hcA",
      "https://goo.gl/maps/scDNRxsQCKsuzZ1w7",
      "https://goo.gl/maps/2KqQMHNcbhb63Jrv9",
      "https://goo.gl/maps/7Ypb5LsDn6gvQPiU8",
      "https://goo.gl/maps/W2aLPzjgBoxw4sov7",
      "https://goo.gl/maps/4BFm1utXegtQaQHH9",
      "https://goo.gl/maps/JxrCdqUzun4gdZtM6",
      "https://goo.gl/maps/bawtFydCJq9WHLRs8",
      "https://goo.gl/maps/3zzoAq8JMjAwmuXw7",
      "https://goo.gl/maps/DPhbcF57o2sfyRKe7",
      "https://goo.gl/maps/QxfSQTTv8iZTTBDn8",
      "https://goo.gl/maps/yQLxHoiNjPL8SGkx8",
    ];
    nearbyPlaces = [];
    for (let i = 0; i < allPlaces.length; i++) {
      nearbyPlaces.push({
        nearby_place_name: allPlaces[i],
        nearby_place_link: nearLinks[i],
      });
    }
  }
  // else if (hotel.name == "Hotel Aira Xing by Staybook") {
  //   let allPlaces = [
  //     "National Crafts Museum 6.5 Km",
  //     "Adventure Ice Land 16.5 km",
  //   ];

  //   let nearLinks = ["dass"];
  //   nearbyPlaces = [];
  //   for (let i = 0; i < allPlaces.length; i++) {
  //     nearbyPlaces.push({
  //       nearby_place_name: allPlaces[i],
  //       nearby_place_link: nearLinks[i],
  //     });
  //   }
  // }
  else {
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
