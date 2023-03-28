/* eslint-disable no-unused-vars */
import React,{createContext, useState} from "react";

export type HotelContextProps = {
  guests: number,
  checkIn: Date,
  checkOut: Date,
  numOfNights: number,
  setnumOfNights:Function,
  setGuests:Function,
  setCheckIn:Function,
  setCheckOut:Function,
};

type Props = {
  children: React.ReactNode;
};

export const HotelContext = createContext<HotelContextProps>({} as HotelContextProps);


export const HotelContextProvider = (props: Props) => {

  const [guests,setGuests] = useState<number>(2)
  const [numOfNights,setnumOfNights] = useState<number>()
  const [checkIn,setCheckIn] = useState<Date>(new Date())
  const [checkOut,setCheckOut] = useState<Date>(new Date(+new Date() + 86400000))

  const contextValue = {
    guests,
    numOfNights,
    checkIn,
    checkOut,
    setnumOfNights,
    setGuests,
    setCheckIn,
    setCheckOut,
  };

  return (
    <HotelContext.Provider value={contextValue as HotelContextProps}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
