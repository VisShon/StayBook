const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const app = express();
const {configFireBase} = require('./config/firebase.ts');
const{errorHandler} = require('./middleware/errorMiddleWare.js');
const https = require('https');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

configFireBase();

app.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY });
});
app.get('/get-bearer', (req, res) => {
    res.send({ key: process.env.META_BEARER });
});

app.post('/create-order', async (req, res) => {

    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      instance.orders.create(options, function(err, order) {
        if (!order) return res.status(500).send('Some error occured');
        res.send(order);
        
      });
    } catch (error) {
      res.status(500).send(error);
  }
});

const port = process.env.PORT || 8000;

app.use('/api', require('./routes/bookingRoutes.js'))

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(errorHandler);
console.log('Starting')
 //app.listen(8000, () => console.log("Listening on 8000"));

const privateKey = fs.readFileSync('/etc/letsencrypt/live/staybook.in/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/staybook.in/fullchain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

const httpsServer = https.createServer(credentials, app);
const redirector = express();
redirector.get('*', (req, res) => res.redirect("https://" + req.headers.host + req.url));
const httpServer = require('http').createServer(redirector);

httpServer.listen(80, () => console.log("Listening on 80 HTTP Redirect"));
httpsServer.listen(443, () => console.log("Listening on 443 HTTPS"));
