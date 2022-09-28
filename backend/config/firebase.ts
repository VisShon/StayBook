// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getDatabase } = require("firebase/database");
const { GoogleAuthProvider } = require("firebase/auth");


const dotenv = require('dotenv').config();

const configFireBase = () => {
    try{
        const firebaseConfig = {
            apiKey: "AIzaSyD3MjpR_Ta6LRfoMOaoX-b-kTlVHuiuHtw",
            authDomain: "staybook-de712.firebaseapp.com",
            databaseURL: "https://staybook-de712-default-rtdb.firebaseio.com",
            projectId: "staybook-de712",
            storageBucket: "staybook-de712.appspot.com",
            messagingSenderId: "946000733513",
            appId: "1:946000733513:web:662ce04b970b3d8eb66698",
            measurementId: "G-V29JV44EFX"
          };
          
          const app = initializeApp(firebaseConfig);
          const database = getDatabase(app);
    }
    catch(err){
        console.log(err);
    }
}

module.exports ={
    configFireBase
}