const asyncHandler = require('express-async-handler');
const{ getDatabase, ref, child, get,set }=require("firebase/database");
const {checkAuth} = require('../middleware/checkAuth')

const db = ref(getDatabase());

const getAllreservations = asyncHandler(async(req, res, next) => {

  get(child(db, `/reservations`)).then((snapshot)=>{
    if (snapshot.exists()) {
      const reservations = Object.keys(snapshot.val())
      .filter(item => Object.values(snapshot.val()[item]).filter(item => item.email==req.body.email).length!==0)
      res.json(reservations);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

})

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
  checkAuth(req, res, next)?
  set(ref(db, `/reservations/${req.params.hotelname}/${req.body.username+"_"+(req.body.amountPaid.toString()).slice(0,3)}`),null):{};
})

const setReservations = asyncHandler(async(req, res, next)=>{
  const db = getDatabase();
  checkAuth(req, res, next)?
  set(ref(db, `/reservations/${req.params.hotelname}/${req.body.username+"_"+(req.body.amountPaid.toString()).slice(0,3)}`), {
    username: req.body.username,
    email: req.body.email,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    amountPaid: req.body.amountPaid,
    selectedPlans: req.body.selectedPlans,
  }) : {}
  res.status(200).send()
})


module.exports ={
  getAllreservations,
    getReservations,
    setReservations,
    removeReservations
}