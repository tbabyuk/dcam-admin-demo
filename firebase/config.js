import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfigAdmin = {
  apiKey: "AIzaSyCOKndlEYUYFp9hgC7geS2GphUcWGjWTEk",
  authDomain: "dcam-admin.firebaseapp.com",
  projectId: "dcam-admin",
  storageBucket: "dcam-admin.appspot.com",
  messagingSenderId: "60735851124",
  appId: "1:60735851124:web:c8d196fd3ae05365649f21"
};


const firebaseConfigStaff = {
  apiKey: "AIzaSyBcamKh36INoRpR98yUKNgVAAvwWwC1ZEk",
  authDomain: "dcam-hours-worked.firebaseapp.com",
  projectId: "dcam-hours-worked",
  storageBucket: "dcam-hours-worked.appspot.com",
  messagingSenderId: "758738253807",
  appId: "1:758738253807:web:47b5cae49f74413104681a",
};



const adminApp = initializeApp(firebaseConfigAdmin)
const staffApp = initializeApp(firebaseConfigStaff, "staff")

export const adminAuth = getAuth(adminApp)
export const adminDB = getFirestore(adminApp)
export const staffDB = getFirestore(staffApp)
