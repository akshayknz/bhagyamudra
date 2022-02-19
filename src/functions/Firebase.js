import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';


const app = firebase.initializeApp({
    apiKey: "AIzaSyBl-KieFNMKz77rBiwXK-xtyphxse08V1I",
    authDomain: "bhagyamudra-3f336.firebaseapp.com",
    projectId: "bhagyamudra-3f336",
    storageBucket: "bhagyamudra-3f336.appspot.com",
    messagingSenderId: "96674836849",
    appId: "1:96674836849:web:43be0ecdcadbf96f0586d0",
    measurementId: "G-TJMYN85ELP"
})

export const auth = app.auth()
export default app
