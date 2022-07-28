import { initializeRazorpay } from "../config/razorPayInitialize";
import '../../frontend/src/app/razorPay'

export const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    
    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, 
      name: "Staybook Pvt Limited!!",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Test Money ",
      image: "../images/staybook.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "StayBook",
        email: "staybook@gmail.com",
        contact: "100000000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };