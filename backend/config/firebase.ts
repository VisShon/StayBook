// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getDatabase } = require("firebase/database");
const { GoogleAuthProvider } = require("firebase/auth");


const dotenv = require('dotenv').config();

const configFireBase = () => {
    try{
        const firebaseConfig = {
            apiKey:process.env.apiKey,
            authDomain:process.env.authDomain,
            databaseURL:process.env.databaseURL,
            projectId:process.env.projectId,
            storageBucket:process.env.storageBucket,
            messagingSenderId:process.env.messagingSenderId,
            appId:process.env.appId,
            measurementId:process.env.measurementId,
          };
          
          const app = initializeApp(firebaseConfig);
          const database = getDatabase(app);
          console.log('Firebase connected')
    }
    catch(err){
        console.log(err);
    }
}

module.exports ={
    configFireBase
}