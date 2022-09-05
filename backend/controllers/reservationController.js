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

const removeReservations = asyncHandler(async(req, res, next) =>{
  const db = getDatabase();
  set(ref(db, `/reservations/${req.params.hotelname}/${req.body.username+"_"+Math.trunc(req.body.amountPaid).toString()}`),null);
})

const setReservations = asyncHandler(async(req, res, next)=>{
  const db = getDatabase();
  set(ref(db, `/reservations/${req.params.hotelname}/${req.body.username+"_"+Math.trunc(req.body.amountPaid).toString()}`), {
    username: req.body.username,
    email: req.body.email,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    amountPaid: req.body.amountPaid,
    selectedPlans: req.body.selectedPlans,
  });
})


module.exports ={
    getReservations,
    setReservations,
    removeReservations
}