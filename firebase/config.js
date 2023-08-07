import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfigAdmin = {
  apiKey: "AIzaSyB5XfLU8vVTU-CgAgxQR5lLjrl0CpiDQQQ",
  authDomain: "dcam-admin-demo.firebaseapp.com",
  projectId: "dcam-admin-demo",
  storageBucket: "dcam-admin-demo.appspot.com",
  messagingSenderId: "93789166981",
  appId: "1:93789166981:web:dd95e2828b05bc9dfb38ec",
  measurementId: "G-HGBS97MPT4"
};


// const firebaseConfigStaff = {
//   apiKey: "AIzaSyCP4d1ovVxGOu-u4dQ1gbUIjbfVQSq0qNc",
//   authDomain: "dcam-staff.firebaseapp.com",
//   projectId: "dcam-staff",
//   storageBucket: "dcam-staff.appspot.com",
//   messagingSenderId: "850429655951",
//   appId: "1:850429655951:web:304e84de015c9bd1ef69fa",
//   measurementId: "G-M3RTET8GCF"
// };


const adminApp = initializeApp(firebaseConfigAdmin)
// const staffApp = initializeApp(firebaseConfigStaff, "staff")

// export const adminAuth = getAuth(adminApp)
export const adminDB = getFirestore(adminApp)
// export const staffDB = getFirestore(staffApp)
