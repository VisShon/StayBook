const express = require('express');
const router = express.Router();
const {getHotelData, isRoomAvailable} = require('../controllers/hotelDataController');
const {getReservations, setReservations} = require('../controllers/reservationController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/:hotelname/isRoomAvailable').get(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);
router.route('/:hotelname/setReservations').post(setReservations);

module.exports = router;