const express = require('express');
const router = express.Router();
const {getHotelData, isRoomAvailable, getReservations} = require('../controllers/hotelDataController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/isRoomAvailable').get(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);


