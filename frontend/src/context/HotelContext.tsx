/* eslint-disable no-unused-vars */
import React,{createContext, useState} from "react";

export type HotelContextProps = {
  guests: number,
  checkIn: Date,
  checkOut: Date,
  numOfNights: number,
  addNDay:Function,
  getDateDifference:Function,
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

  const addNDay = (startDate: Date, numOfDays: number|string) => {
    const result = new Date(startDate);
    result.setDate(result.getDate() + Number(numOfDays));
    setCheckOut(result);
    return result;
  }
  
  const getDateDifference = (checkInDate: Date, checkOutDate: Date) => {
    var timeDiff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    var dayDiff =  timeDiff / (1000 * 3600 * 24);
    setnumOfNights(Math.ceil(dayDiff));
    return Math.ceil(dayDiff);
  }

  const contextValue = {
    guests,
    numOfNights,
    checkIn,
    checkOut,
    setGuests,
    setCheckIn,
    setCheckOut,
    addNDay,
    getDateDifference,
  };

  return (
    <HotelContext.Provider value={contextValue as HotelContextProps}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
