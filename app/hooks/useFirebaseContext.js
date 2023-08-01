
import { FirebaseContext } from "../context/FirebaseContext";
import { useContext } from "react";



export const useFirebaseContext = () => {
    return useContext(FirebaseContext)
}



