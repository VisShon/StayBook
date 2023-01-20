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

function BookingCard({ hotelName, address, cardRef }: any) {
  const ref: string = new URL(window.location.href).pathname;

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const CheckOutDate = sessionStorage.getItem("checkOut");
  const CheckInDate = sessionStorage.getItem("checkIn");
  const [checkInGlobal, setcheckInGlobal] = useContext(checkInContext);
  const [checkOutGlobal, setcheckOutGlobal] = useContext(checkOutContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [checkIn, setCheckIn] = useState<Date | null>(
    CheckInDate ? new Date(CheckInDate) : today
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    CheckOutDate ? new Date(CheckOutDate) : tomorrow
  );
  setcheckInGlobal(checkIn);
  setcheckOutGlobal(checkOut);

  const dispatch = useAppDispatch();
  const withoutTax = useAppSelector((state) => state.price.withoutTax);
  const price = useAppSelector((state) => state.price.value);
  const Plans = useAppSelector((state) => state.plans.selectedPlans);

  const [contact, setContact] = useState<any>("");
  const [payAtHotel, setPayAtHote] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [noSelected, setNoSelected] = useState<boolean>(false);
  const [noContact, setNoContact] = useState<boolean>(false);

  const { username, email, phone, Login } =
    useContext<AuthContextProps>(AuthContext);

  const navigate = useNavigate();
  const payOnHotel = async () => {
    window.scrollTo(0, 0);
    let waysConveyed = 0;
    if (!username) {
      await Login();
    }
    if (!contact) {
      setNoContact(true);
      setTimeout(() => {
        setNoContact(false);
      }, 2000);
      return;
    }
    if (Plans.length == 0) {
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
      to_name: sessionStorage.getItem("email"),
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
      status: `Amount due: ₹${price}, Pay now to save extra ₹${Math.min(175, (0.05 * price))}-`,
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
          "Y2_mfBY5Jp8HKpbfz"
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
          username: username,
          email: email,
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
                value={checkIn}
                minDate={new Date()}
                onChange={(newValue: any) => {
                  setCheckIn(newValue);
                  setcheckInGlobal(newValue);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["day", "month"]}
                label="Check Out"
                value={checkOut}
                minDate={checkIn}
                onChange={(newValue: any) => {
                  setCheckOut(newValue);
                  setcheckOutGlobal(newValue);
                  dispatch(resetPlans());
                  dispatch(numberOfChildren("0"));
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
            <>
              <PhoneInput
                className="phone"
                defaultCountry="IN"
                placeholder="Phone number (eg: 917017495876)"
                value={contact}
                onChange={setContact}
              />
              <div onClick={payOnHotel} className="button">
                Continue
              </div>
            </>
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
