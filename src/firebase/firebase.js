import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH5inYpaWMi3mDkM_vkmEluoJ7GcdyJBQ",
  authDomain: "insta-clone-67014.firebaseapp.com",
  projectId: "insta-clone-67014",
  storageBucket: "insta-clone-67014.appspot.com",
  messagingSenderId: "926811193912",
  appId: "1:926811193912:web:581b951ff7de96d0839ccd",
  measurementId: "G-05XN2N1PR4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};