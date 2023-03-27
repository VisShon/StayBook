import React, { useState, useEffect, useContext } from "react";
import "../styles/BookingCard.scss";
import AmountCard from "./AmountCard";
import SelectedPlan from "./SelectedPlan";
import emailjs from "@emailjs/browser";
import Button from "./Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useAppSelector } from "../app/hooks";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
import { useAppDispatch } from "../app/hooks";
import { removePlan, resetPlans } from "../app/planSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { checkInContext, checkOutContext } from "../App";
import { numberOfChildren } from "../app/priceSlice";
import Spinner from "./Spinner";
import HotelContext from "../context/hotel-context";


import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { format } from "date-fns";

function addNDay(startDate: string | number | Date, numOfDays: number) {
  const result = new Date(startDate);
  result.setDate(result.getDate() + Number(numOfDays));
  return result;
}

function getDateDifference(checkInDate: string | number | Date, checkOutDate: string | number | Date) {
  var timeDiff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  var dayDiff =  timeDiff / (1000 * 3600 * 24);

  return Math.ceil(dayDiff);
}

function getDateFormatToUrl(givenDate: string | number | Date) {
  const result = format(new Date(givenDate), 'dd/MM/yyyy');
  var d00 = result.toString().split("/")[0];
  var d01 = result.toString().split("/")[1];
  var d02 = result.toString().split("/")[2];
  
  return `${d00}-${d01}-${d02}`;
}

function BookingCard({
  hotelName,
  address,
  cardRef,
  hotelId,
  hotelNameSlug,
  checkInVal,
  checkOutVal,
}: any) {
  const hotelCtx = React.useContext(HotelContext);
  const navigate = useNavigate();
  const ref: string = new URL(window.location.href).pathname;
  // const navigate = useNavigate();
  // var checkIn = format(hotelCtx.checkIn as Date, 'dd/MM/yyyy');
  // var checkOut = format(hotelCtx.checkOut as Date, 'dd/MM/yyyy');
  // var checkInSplit = checkIn.toString().split("/");
  // var checkOutSplit = checkOut.toString().split("/");
  // var checkInInfo = `${checkInSplit[0]}-${checkInSplit[1]}-${checkInSplit[2]}`;
  // var checkOutInfo = `${checkOutSplit[0]}-${checkOutSplit[1]}-${checkOutSplit[2]}`;
  // const [searchParams, setSearchParams] = useSearchParams({checkin: checkInInfo, num_nights: hotelCtx.numOfNights.toString(), num_guests: hotelCtx.numOfGuests.toString(), hotel_id: hotelId});

  // const [searchParams, setSearchParams] = useSearchParams({checkin: String(hotelCtx.checkIn), num_nights: String(hotelCtx.numOfNights), num_guests: String(hotelCtx.numOfGuests), hotel_id: hotelId});
  // const [searchParams, setSearchParams] = useSearchParams({checkin: getDateFormatToUrl(hotelCtx.checkIn), num_nights: String(hotelCtx.numOfNights), num_guests: String(hotelCtx.numOfGuests), hotel_id: hotelId});

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const CheckOutDate = sessionStorage.getItem("checkOut");
  const CheckInDate = sessionStorage.getItem("checkIn");
  const [checkInGlobal, setcheckInGlobal] = useContext(checkInContext);
  const [checkOutGlobal, setcheckOutGlobal] = useContext(checkOutContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  var tempDate = new Date();
  const [checkIn, setCheckIn] = useState<Date | null>(
    CheckInDate ? new Date(CheckInDate) : today
  );
  const [initCheckout, setinitCheckout] = useState<Date | null>(
    CheckInDate ? new Date(CheckInDate) : today
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    CheckOutDate ? new Date(CheckOutDate) : tomorrow
  );
  setcheckInGlobal(hotelCtx.checkIn);
  setcheckOutGlobal(hotelCtx.checkOut);

  const dispatch = useAppDispatch();
  const withoutTax = useAppSelector((state) => state.price.withoutTax);
  const price = useAppSelector((state) => state.price.value);
  const Plans = useAppSelector((state) => state.plans.selectedPlans);

  const [contact, setContact] = useState<any>("");
  const [payAtHotel, setPayAtHote] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [noSelected, setNoSelected] = useState<boolean>(false);
  const [noContact, setNoContact] = useState<boolean>(false);
  const [fullname, setFullname] = useState<any>("");
  const [useremail, setUserEmail] = useState<any>("");

  const { username, email, phone, Login } =
    useContext<AuthContextProps>(AuthContext);

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
  const payOnHotel = async () => {
    window.scrollTo(0, 0);
    let waysConveyed = 0;

    if (!username && (!fullname || !useremail)) {
      setNoContact(true);
      setTimeout(() => {
        setNoContact(false);
      }, 2000);
      return;
    }

    if (!contact) {
      setNoContact(true);
      setTimeout(() => {
        setNoContact(false);
      }, 2000);
      return;
    }

    if (Plans.length === 0) {
      setNoSelected(true);
      setTimeout(() => {
        setNoSelected(false);
      }, 2000);
      return;
    }

    let guests = 0;
    Plans.forEach((plan) => {
      guests += plan.guests;
    });

    setIsLoading(true);
    const {
      data: { key: bearer },
    } = await axios.get("/get-bearer");

    let templateParams = {
      to_name: username ? sessionStorage.getItem("email") : useremail,
      hotelName: hotelName,
      checkIn: checkIn!.toLocaleDateString(),
      checkOut: checkOut!.toLocaleDateString(),
      roomNumbers: Plans.length.toString(),
      rooms: Plans.reduce(
        (roomString, curPlan) =>
          (roomString += `${curPlan.roomType} (${curPlan.title}), `),
        ""
      ),
      guests: guests.toString(),
      hotelContact: "+918373929299",
      address: address,
      status: `Amount due: ₹${price}, Pay now to save extra ₹${Math.min(
        175,
        0.05 * price
      )}-`,
      customerContact: contact,
    };
    try {
      await axios.post(
        "https://graph.facebook.com/v14.0/113549444945607/messages/",
        {
          messaging_product: "whatsapp",
          to: contact,
          type: "template",
          template: {
            name: "hotel_order",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: templateParams.hotelName,
                  },
                  {
                    type: "text",
                    text: templateParams.checkIn,
                  },
                  {
                    type: "text",
                    text: templateParams.checkOut,
                  },
                  {
                    type: "text",
                    text: templateParams.roomNumbers,
                  },
                  {
                    type: "text",
                    text: templateParams.guests,
                  },
                  {
                    type: "text",
                    text: templateParams.hotelContact,
                  },
                  {
                    type: "text",
                    text: templateParams.address,
                  },
                  {
                    type: "text",
                    text: templateParams.status,
                  },
                  {
                    type: "text",
                    text: templateParams.rooms,
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      waysConveyed += 1;
    } catch (error) {
      console.log(error);
    }

    try {
      await emailjs
        .send(
          "service_pz9e3th",
          "template_i78ka1b",
          templateParams,
          "rxw7da9yaeHbqZ1ou"
        )
        .then(() => {
          setIsPaid(true);
          waysConveyed += 1;
        });
    } catch (error) {
      console.log(error);
    }
    setIsPaid(true);
    try {
      await axios.post(
        `/api${ref}/setReservations`,
        {
          username: username ? username : fullname,
          email: username ? email : useremail,
          checkIn: checkIn,
          checkOut: checkOut,
          amountPaid: price.toString() + "(To be Paid)",
          selectedPlans: Plans,
        },
        {
          headers: {
            Authorization: `bearer ${sessionStorage["user"]}`,
          },
        }
      );

      waysConveyed += 1;
    } catch (error) {
      console.log(error);
    }
    console.log("Ways conveyed ", waysConveyed);
    setIsLoading(false);
    if (waysConveyed > 0) {
      navigate("/hotelbookingconfirmation", {
        state: { confirmed: true, guestInfo: templateParams, name: "sabaoon" },
      });
    }
  };

  useEffect(() => {
    dispatch(removePlan({ title: "Monthly Rate", roomType: "Deluxe Suite" }));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="bookingCard" ref={cardRef}>
      <h1>₹{withoutTax}</h1>
      <div className="calendar">
        <div className="input">
          <div style={{ marginRight: "0.5rem" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check In"
                value={hotelCtx.checkIn}
                minDate={new Date()}
                onChange={(newValue: any) => {
                  hotelCtx.checkIn = newValue;
                  // hotelCtx.numOfNights = getDateDifference(newValue, hotelCtx.checkOut);
                  console.log(`ci: ${newValue}`);

                  // setSearchParams({checkin: getDateFormatToUrl(newValue), num_nights: String(getDateDifference(newValue, hotelCtx.checkOut)), num_guests: String(hotelCtx.numOfGuests), hotel_id: hotelId});
                  // console.log(searchParams.get('checkin'));

                  setCheckIn(newValue);
                  setcheckInGlobal(newValue);
                  tempDate.setDate(newValue.getDate() + 1);
                  setinitCheckout(tempDate);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
                  var element = document
                    .querySelector("#toOpen")
                    ?.querySelector("button");
                  simulateMouseClick(element);
                  
                  var hotelUrl = `checkin=${getDateFormatToUrl(newValue)}&num_nights=${getDateDifference(newValue, hotelCtx.checkOut)}&num_guests=${hotelCtx.numOfGuests}&hotel_id=${hotelId}`;
                  navigate(`/hotel/google/list/${hotelId}/${hotelUrl}`);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div id="toOpen">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["day", "month"]}
                label="Check Out"
                value={hotelCtx.checkOut}
                minDate={initCheckout}
                onChange={(newValue: any) => {
                  hotelCtx.checkOut = newValue;
                  hotelCtx.numOfNights = getDateDifference(hotelCtx.checkIn, newValue);
                  console.log(`co: ${newValue}`);

                  // setSearchParams({checkin: getDateFormatToUrl(hotelCtx.checkIn), num_nights: String(getDateDifference(hotelCtx.checkIn, newValue)), num_guests: String(hotelCtx.numOfGuests), hotel_id: hotelId});
                  // console.log(searchParams.get('checkin'));

                  setCheckOut(newValue);
                  setcheckOutGlobal(newValue);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
                  console.log(hotelCtx.checkIn);
                  console.log("New Value of Date" + newValue);
                  console.log(getDateDifference(hotelCtx.checkIn, newValue));
                  
                  var hotelUrl = `checkin=${getDateFormatToUrl(hotelCtx.checkIn)}&num_nights=${getDateDifference(hotelCtx.checkIn, newValue)}&num_guests=${hotelCtx.numOfGuests}&hotel_id=${hotelId}`;
                  navigate(`/hotel/google/list/${hotelId}/${hotelUrl}`);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <p>{Plans.length} rooms</p>

      <div className="selectedPlans">
        {Plans.map((item, index) => (
          <SelectedPlan
            maxCap={item.maxCap}
            roomType={item.roomType}
            title={item.title}
            checkOut={checkOut}
            checkIn={checkIn}
            key={index}
          />
        ))}
      </div>

      <AmountCard checkOut={checkOut} checkIn={checkIn} />

      <input
        type="checkbox"
        name="input"
        style={{ marginTop: "10px" }}
        onChange={() => setPayAtHote((prev) => !prev)}
      />
      <label> Pay at hotel </label>

      {noSelected && (
        <div className="unselected">Please select a plan to continue</div>
      )}
      {noContact && (
        <div className="unselected">Please enter contact details</div>
      )}
      <div className="payAtHotel">
        {!isPaid ? (
          payAtHotel && (
            <form>
              {!username && (
                <input
                  className="customer-form"
                  type="text"
                  placeholder="Full name"
                  required
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                />
              )}
              {!username && (
                <input
                  className="customer-form"
                  type="email"
                  placeholder="Your email address"
                  required
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={useremail}
                />
              )}
              <PhoneInput
                className="phone"
                defaultCountry="IN"
                placeholder="Phone number (eg: 917017495876)"
                value={contact}
                onChange={setContact}
              />
              <div className="button" onClick={payOnHotel}>
                Continue
              </div>
            </form>
          )
        ) : (
          <div className="Button-Loading">Booking Done</div>
        )}
      </div>

      {!payAtHotel && (
        <Button
          checkOut={checkOut}
          checkIn={checkIn}
          hotel={hotelName}
          address={address}
        />
      )}
    </div>
  );
}

export default BookingCard;
