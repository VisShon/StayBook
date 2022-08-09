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
    var len = req.body.list.length;
    var resultList = []
    for (let i = 0; i < len; i++) {
        resultList.push(list[i] < req.body.max);
    }

    res.json(resultList)
});

const getReservations = asyncHandler(async(req, res, next) =>{
    get(child(db, `/reservations/${req.params.hotelname}`)).then((snapshot) => {
        if (snapshot.exists()) {
          res.json(snapshot)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

})

module.exports ={
    getHotelData,
    isRoomAvailable,
    getReservations
}
