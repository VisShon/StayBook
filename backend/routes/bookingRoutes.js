const express = require('express');
const router = express.Router();
const {getHotelData,getMax,isRoomAvailable,getAllData} = require('../controllers/hotelDataController');
const {getReservations, setReservations} = require('../controllers/reservationController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/getAllData').get(getAllData);
router.route('/:hotelname/isRoomAvailable').post(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);
router.route('/:hotelname/getMax').post(getMax);
router.route('/:hotelname/setReservations').post(setReservations);

module.exports = router;