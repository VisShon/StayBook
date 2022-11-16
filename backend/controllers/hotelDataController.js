const asyncHandler = require('express-async-handler');
const{ getDatabase, ref, child, get }=require("firebase/database");


const db = ref(getDatabase());

// const getAllData = asyncHandler(async(req, res, next) => {
//   get(child(db, `/hotelData`)).then((snapshot) => {
//       if (snapshot.exists()) {
//         res.json(snapshot)
//       } else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });      
// });

// const getHotelData = asyncHandler(async(req, res, next) => {
//     get(child(db, `/hotelData/${req.params.hotelname}`)).then((snapshot) => {
//         if (snapshot.exists()) {
//           res.json(snapshot)
//         } else {
//           console.log("No data available");
//         }
//       }).catch((error) => {
//         console.error(error);
//       });      
// });

const getMax = asyncHandler(async(req, res, next) =>{
    get(child(db, `/hotelData/${req.params.hotelname}`)).then((snapshot) => {
      if (snapshot.exists()) {
        try{
          const roomMaxCap=Object.values(snapshot.val().rooms).filter(item => item.type===req.body.roomType)[0].totalRooms
          res.json(roomMaxCap)
        }
        catch(error) {
          res.json(0);
        }

      } else {
        console.log("No data available");
      }
    })
});




const isRoomAvailable = asyncHandler(async(req, res, next) =>{
  const checkAvailability = (array,checkIn,checkOut,maxCap) =>{

    let start  = new Date(checkIn).getTime();
    let end = new Date(checkOut).getTime();
    let count =0;
    for (var i = 0; i < array.length; i++) {
        let wt = array[i]["selectedPlans"];
        let cIn = new Date(array[i]["checkIn"]).getTime();
        let cOut = new Date(array[i]["checkOut"]).getTime();
        if(cOut < start || cIn > end)continue;
        count+=wt;
    }
    return (count + 1)<=maxCap;
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
    getMax,
    getAllData
}
