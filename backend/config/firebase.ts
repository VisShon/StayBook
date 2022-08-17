// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getDatabase } = require("firebase/database");
const { GoogleAuthProvider } = require("firebase/auth");


const dotenv = require('dotenv').config();

const configFireBase = () => {
    try{
        const firebaseConfig = {
            apiKey: "AIzaSyBg3QZs7XNtzzp8nfzYOaVr2tpgXRhSMwM",
            authDomain: "staybook-7d6bb.firebaseapp.com",
            databaseURL: "https://staybook-7d6bb-default-rtdb.firebaseio.com",
            projectId: "staybook-7d6bb",
            storageBucket: "staybook-7d6bb.appspot.com",
            messagingSenderId: "620990788027",
            appId: "1:620990788027:web:ae862bfd5fb02aebc9549e",
            measurementId: "G-EBW2DWVQNT"
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