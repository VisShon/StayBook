import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyD3MjpR_Ta6LRfoMOaoX-b-kTlVHuiuHtw',
    authDomain: 'staybook-de712.firebaseapp.com',
    databaseURL: 'https://staybook-de712-default-rtdb.firebaseio.com',
    projectId: 'staybook-de712',
    storageBucket: 'staybook-de712.appspot.com',
    messagingSenderId: '946000733513',
    appId: '1:946000733513:web:662ce04b970b3d8eb66698',
    measurementId: 'G-V29JV44EFX',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export const auth = getAuth(app)

// export const Login = () => {return signInWithPopup(auth,provider)}

export const listAllUsers = () => {
    getAuth()
        .listUsers()
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                console.log('user', userRecord.toJSON())
            })
        })
}
