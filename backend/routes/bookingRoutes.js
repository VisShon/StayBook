const express = require('express');
const router = express.Router();
const {getHotelData,getMax,isRoomAvailable,getAllData} = require('../controllers/hotelDataController');
const {getAllreservations,getReservations, setReservations,removeReservations} = require('../controllers/reservationController');


router.route('/:hotelname/getHotelData').get(getHotelData);
router.route('/getAllData').get(getAllData);
router.route('/:hotelname/isRoomAvailable').post(isRoomAvailable);
router.route('/:hotelname/getReservations').get(getReservations);
router.route('/getAllReservations').post(getAllreservations);
router.route('/:hotelname/removeReservation').post(removeReservations);
router.route('/:hotelname/getMax').post(getMax);
router.route('/:hotelname/setReservations').post(setReservations);

module.exports = router;