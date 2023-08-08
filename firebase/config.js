import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";



const firebaseConfigAdmin = {
  apiKey: "AIzaSyB5XfLU8vVTU-CgAgxQR5lLjrl0CpiDQQQ",
  authDomain: "dcam-admin-demo.firebaseapp.com",
  projectId: "dcam-admin-demo",
  storageBucket: "dcam-admin-demo.appspot.com",
  messagingSenderId: "93789166981",
  appId: "1:93789166981:web:dd95e2828b05bc9dfb38ec",
  measurementId: "G-HGBS97MPT4"
};


const firebaseConfigStaff = {
  apiKey: "AIzaSyCIuBmRbYjwpQf8cky3OoVdGN4kvRJAoMU",
  authDomain: "dcam-staff-demo.firebaseapp.com",
  projectId: "dcam-staff-demo",
  storageBucket: "dcam-staff-demo.appspot.com",
  messagingSenderId: "333129012535",
  appId: "1:333129012535:web:2fbd22f183042993fa36b2",
  measurementId: "G-63E5EDK729"
};


const adminApp = initializeApp(firebaseConfigAdmin)
const staffApp = initializeApp(firebaseConfigStaff, "staff")

// export const adminAuth = getAuth(adminApp)
export const adminDB = getFirestore(adminApp)
export const staffDB = getFirestore(staffApp)
