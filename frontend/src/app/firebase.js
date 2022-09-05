import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";



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
  export const auth = getAuth(app)

// export const Login = () => {return signInWithPopup(auth,provider)}

export const listAllUsers = () => {
  getAuth().listUsers().then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      console.log('user', userRecord.toJSON());
    })
  });
}