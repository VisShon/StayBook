const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();
const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.post('/create-order', async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send('Some error occured');
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);



