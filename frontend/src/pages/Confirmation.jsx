import "../styles/Confirmation.scss";
import { useLocation } from "react-router-dom";
import React, {useEffect} from "react";

function Confirmation(props) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  let greeting = `Dear customer, \nThank you for choosing Staybook.`;
  let hotelInfo = `Your booking for ${location.state.guestInfo.hotelName} is confirmed.`;

  let allInfo = `Check-in Date: ${location.state.guestInfo.checkIn}\n
Check-in Time: 12:00 PM onwards\n
Checkout Date: ${location.state.guestInfo.checkOut}\n
Checkout Time: till 11:00 AM\n
No. of Rooms: ${location.state.guestInfo.roomNumbers}\n
Rooms: ${location.state.guestInfo.rooms}\n
Guests : ${location.state.guestInfo.guests}\n
Reception Contact: +918373929299\n
Address:${location.state.guestInfo.address}\n
${location.state.guestInfo.status}\n
Customer Contact: ${location.state.guestInfo.customerContact}\n`;

  let sign =
    "Please Note - You can check in using any government-issued ID (except PAN card) and address proof of any local or outstation address. Do carry your original ID (Photocopy not accepted) for cross-verification. Couples are welcome.For more assistance, please visit the staybook help centre\nDetails have also been shared with you over email. If not, please contact our reception desk for confirmation.  \nWish you a pleasant stay! \nTeam Staybook";
  return (
    <>
      <div className="confirmHeader">
        {greeting.split("\n").map((str) => (
          <h1>{str}</h1>
        ))}

        {hotelInfo.split("\n").map((str) => (
          <h2>{str}</h2>
        ))}
      </div>

      <div className="info">
        {allInfo.split("\n").map((str) => (
          <h3>{str}</h3>
        ))}
      </div>
      <div className="sign">
        {sign.split("\n").map((str) => (
          <h3>{str}</h3>
        ))}
      </div>
    </>
  );
}

export default Confirmation;
