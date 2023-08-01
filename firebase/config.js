import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfigAdmin = {
  apiKey: "AIzaSyDBaoqxXhQlcRHZ-jFDyIEASZ01O6ypd6Q",
  authDomain: "dcam-todos-react.firebaseapp.com",
  projectId: "dcam-todos-react",
  storageBucket: "dcam-todos-react.appspot.com",
  messagingSenderId: "408866416720",
  appId: "1:408866416720:web:fde75d87f820e28c8c8955"
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
