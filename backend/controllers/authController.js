const asyncHandler = require('express-async-handler');
const { getAuth, signInWithRedirect, GoogleAuthProvider } = require("firebase/auth");

const provider = new GoogleAuthProvider();

const login = asyncHandler(async(req, res, next) =>{
    
})


module.exports ={
    login: login
}