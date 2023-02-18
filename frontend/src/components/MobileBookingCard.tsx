import '../styles/BookingCard.scss'
import { useAppSelector } from '../app/hooks'
import React, { useState, useEffect, useContext } from "react";
import "../styles/BookingCard.scss";
import AmountCard from "./AmountCard";
import SelectedPlan from "./SelectedPlan";
import emailjs from "@emailjs/browser";
import Button from "./Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
import { useAppDispatch } from "../app/hooks";
import { removePlan, resetPlans } from "../app/planSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { checkInContext, checkOutContext } from "../App";
import { numberOfChildren } from "../app/priceSlice";
const MobileBookingCard = ({ scrollToCard }: any) => {
  const [checkInGlobal, setcheckInGlobal] = useContext(checkInContext);
  const [checkOutGlobal, setcheckOutGlobal] = useContext(checkOutContext);
  const [CheckInLocal, setCheckInLocal] = [checkInGlobal, setcheckInGlobal];
  const [CheckOutLocal, setCheckOutLocal] = [checkOutGlobal, setcheckOutGlobal];
  var tempDate = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dispatch = useAppDispatch();
  const [initCheckout, setinitCheckout] = useState<Date | null>(
    checkInGlobal ? new Date(checkInGlobal) : tomorrow
  );
  const hi = () => { 
  console.log(checkInGlobal);
}
  const hi2 = () => { 
  console.log(checkOutGlobal);
  }
   const mouseClickEvents = ["mousedown", "click", "mouseup"];
   function simulateMouseClick(element: any) {
     mouseClickEvents.forEach((mouseEventType) =>
       element.dispatchEvent(
         new MouseEvent(mouseEventType, {
           view: window,
           bubbles: true,
           cancelable: true,
           buttons: 1,
         })
       )
     );
   }
  const withoutTax = useAppSelector((state) => state.price.withoutTax);
    return (
      <div className="mobile-booking-card">
        <p>₹{withoutTax}</p>
        {/* <button onClick={hi}>Hello</button>
        <button onClick={hi2}>Hello2</button> */}
        <div className="datesSelect">
          <div style={{ marginRight: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd-MM-yyyy"
                label="Check In mbc1"
                value={CheckInLocal}
                minDate={new Date()}
                onChange={(newValue: any) => {
                  setCheckInLocal(newValue);
                  setcheckInGlobal(newValue);
                  console.log(newValue);
                  tempDate.setDate(newValue.getDate() + 1);
                  setinitCheckout(tempDate);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div id="toOpen">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd-MM-yyyy"
                views={["day", "month"]}
                label="Check Out"
                value={CheckOutLocal}
                minDate={initCheckout}
                onChange={(newValue: any) => {
                  setcheckOutGlobal(newValue);
                  setCheckOutLocal(newValue);
                  console.log(newValue);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="continue" onClick={scrollToCard}>
          Continue to book
        </div>
      </div>
    );
}

export default MobileBookingCard
