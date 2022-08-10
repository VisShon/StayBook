const express = require('express');
const router = express.Router();
const {getHotelData, isRoomAvailable, getReservations, setReservations} = require('../controllers/hotelDataController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/isRoomAvailable').get(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);
router.route('/:hotelname/setReservations').post(setReservations);

module.exports = router;