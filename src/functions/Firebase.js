import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence, browserPopupRedirectResolver, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import 'firebase/compat/analytics';
import { getStorage, ref } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");
const app = firebase.initializeApp({
    apiKey: "AIzaSyBl-KieFNMKz77rBiwXK-xtyphxse08V1I",
    authDomain: "bhagyamudra-3f336.firebaseapp.com",
    projectId: "bhagyamudra-3f336",
    storageBucket: "bhagyamudra-3f336.appspot.com",
    messagingSenderId: "96674836849",
    appId: "1:96674836849:web:43be0ecdcadbf96f0586d0",
    measurementId: "G-TJMYN85ELP"
})
// window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LeOLckeAAAAAM70NAwx_Kwh_YMdt-hBOZwMAq9l'),
    isTokenAutoRefreshEnabled: true
  });
export const auth = app.auth()
export default app

export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);