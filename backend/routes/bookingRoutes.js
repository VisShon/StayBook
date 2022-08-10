const express = require('express');
const router = express.Router();
const {getHotelData, isRoomAvailable} = require('../controllers/hotelDataController');
const {getReservations, setReservations} = require('../controllers/reservationController');
const {login} = require('../controllers/authController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/isRoomAvailable').get(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);
router.route('/:hotelname/setReservations').post(setReservations);
router.route('/login').get(login);

module.exports = router;