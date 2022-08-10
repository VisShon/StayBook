const asyncHandler = require('express-async-handler');
const { getAuth, signInWithRedirect, GoogleAuthProvider } = require("firebase/auth");

const provider = new GoogleAuthProvider();

const login = asyncHandler(async(req, res, next) =>{
    const auth = getAuth();
    signInWithRedirect(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        console.log(error);
    });
})

module.exports ={
    login: login
}