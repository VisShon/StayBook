const asyncHandler = require('express-async-handler');
const{ getDatabase, ref, child, get,set }=require("firebase/database");


const db = ref(getDatabase());

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

const setReservations = asyncHandler(async(req, res, next)=>{
  const db = getDatabase();
  set(ref(db, `/reservations/${req.params.hotelname}/${req.body.username+"_"+req.body.checkIn.slice('/',2)}`), {
    username: req.body.username,
    email: req.body.email,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    amountPaid: req.body.amountPaid
  });
})


module.exports ={
    getReservations,
    setReservations
}