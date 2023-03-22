/* eslint-disable no-unused-vars */
import React from "react";

const hotelId = "";
const numOfGuests = 2;
const currDate = Date.now();
const tommDate = addOneDay(currDate);

const hotelMap = {
  "aira-xing": 24669,
  "jyoti-mahal": 25095,
  "jai-balaji": 23690,
  "pinky-villa": 23540,
  "atlanta-near-new-delhi-train-station": 4,
  "staybook-woods-view": 5,
  "shiv-dev": 6,
  "staybook-blue-sky-camp": 7,
  "staybook-south-delhi": 23719,
  "staybook-city-stories-new-delhi-train-station": 9,
};

function addOneDay(startDate: string | number | Date) {
  const result = new Date(startDate);
  result.setDate(result.getDate() + 1);
  return result;
}

function getDateDifference(checkInDate: string | number | Date, checkOutDate: string | number | Date) {
  var timeDiff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  var dayDiff =  timeDiff / (1000 * 3600 * 24);

  return dayDiff;
}

export type HotelContextProps = {
  hotelId: string;
  numOfGuests: number;
  numOfNights: number;
  checkIn: string | number | Date;
  checkOut: string | number | Date;
};

type Props = {
  children: React.ReactNode;
};

export const HotelContext = React.createContext<HotelContextProps>({
  hotelId: hotelId,
  numOfGuests: numOfGuests,
  checkIn: currDate,
  checkOut: tommDate,
  numOfNights: getDateDifference(currDate, tommDate),
} as HotelContextProps);

export const HotelContextProvider = (props: Props) => {
  const contextValue = {
    hotelId: hotelId,
    numOfGuests: numOfGuests,
    checkIn: currDate,
    checkOut: tommDate,
    numOfNights: getDateDifference(currDate, tommDate),
  };
  return (
    <HotelContext.Provider value={contextValue}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelContext;

// const HotelContext = React.createContext({
//   hotelUrl: "",
//   checkInDate: currDate,
//   checkOutDate: tommDate,
// });

// export const HotelContextProvider = (props) => {
//   const contextValue = {
//     hotelUrl: "",
//     checkInDate: currDate,
//     checkOutDate: tommDate,
//   };

//   return (
//     <HotelContext.Provider value={contextValue}>
//       {props.children}
//     </HotelContext.Provider>
//   );
// };

// export default HotelContext;
