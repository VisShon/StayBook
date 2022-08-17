const asyncHandler = require('express-async-handler');
const{ getDatabase, ref, child, get }=require("firebase/database");


const db = ref(getDatabase());

const getHotelData = asyncHandler(async(req, res, next) => {
    get(child(db, `/hotelData/${req.params.hotelname}`)).then((snapshot) => {
        if (snapshot.exists()) {
          res.json(snapshot)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });      
});

const isRoomAvailable = asyncHandler(async(req, res, next) =>{
    const checkAvailability = (array,checkIn,checkOut,maxCap) => {
      //CODE
    }

    get(child(db, `/reservations/${req.params.hotelname}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const particularReservations = Object.values(snapshot.val()).map(
          ({selectedPlans,checkIn,checkOut})=>({selectedPlans:selectedPlans.filter(
            plans=>plans.roomType==req.body.roomType),checkIn,checkOut}))

        const array = particularReservations.map(({selectedPlans,checkIn,checkOut})=>({selectedPlans:selectedPlans.length,checkIn,checkOut}))
        const isAvailable = checkAvailability(array,req.body.checkIn,req.body.checkOut,req.body.maxCap)

        res.json(isAvailable)

      } else {
        console.log("No data available");
      }
    })
});


module.exports ={
    getHotelData,
    isRoomAvailable,
}
