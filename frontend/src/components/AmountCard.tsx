import { useState, useEffect } from "react";
import "../styles/BookingCard.scss";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updatePrice, updateWithoutTaxPrice } from "../app/priceSlice";

function AmountCard({ checkIn, checkOut }: any) {
  const plans = useAppSelector((state) => state.plans.selectedPlans);
  const children = useAppSelector((state) => state.price.children);
  const dispatch = useAppDispatch();

  const [roomPrice, setRoomPrice] = useState(0.0);
  const [tax, setTax] = useState(0.0);

  const getPrice = (
    date: Date,
    arrOfObjects: any,
    defaultPrice: number
  ): number => {
    date.setHours(23, 59, 59, 999);
    for (let i = 0; i < arrOfObjects.length; i++) {
      let startDate = new Date(arrOfObjects[i].starting_date);
      let endDate = new Date(arrOfObjects[i].ending_date);
      startDate.setHours(23, 59, 59, 999);
      endDate.setHours(23, 59, 59, 999);
      if (date >= startDate && date <= endDate) {
        return arrOfObjects[i].price;
      }
    }
    return defaultPrice;
  };

  const getTotalCost = (checkIn: Date, checkOut: Date, plan: any): number => {
    let totalPrice = 0;
    checkIn.setHours(23, 59, 59, 999);
    checkOut.setHours(23, 59, 59, 999);
    let tempCheckIn = new Date(checkIn.getTime());
    while (tempCheckIn < checkOut) {
      if (!plan.price_planner) {
        totalPrice += plan.price;
      } else {
        totalPrice += getPrice(tempCheckIn, plan.price_planner, plan.price);
      }
      totalPrice += children * 500;
      let newDate = tempCheckIn.setDate(tempCheckIn.getDate() + 1);
      tempCheckIn = new Date(newDate);
    }
    return totalPrice;
  };

  useEffect(() => {
    var x: number = 0;
    plans.forEach((plan: any) => {
      x += getTotalCost(checkIn, checkOut, plan);
    });

    setRoomPrice(x);
    let taxPrice: number = parseFloat((x * (12 / 100)).toFixed(3));
    setTax(taxPrice);

    dispatch(updateWithoutTaxPrice(x));
    dispatch(updatePrice(x + taxPrice));
  }, [plans.length, children]);

  return (
    <div className="amountCard">
      <div className="wrapper">
        <span>Room Price</span>
        <span>₹{roomPrice}</span>
      </div>
      <div className="wrapper">
        <span>Tax</span>
        <span>₹{tax}</span>
      </div>
      <div className="wrapper">
        <span>Total Price</span>
        <span>₹{roomPrice + tax}</span>
      </div>
    </div>
  );
}

export default AmountCard;
