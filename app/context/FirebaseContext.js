"use client"


import { useEffect, useState } from "react"
import { createContext } from "react"
import { adminAuth, adminDB } from "@/firebase/config"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useRouter } from "next/navigation";


export const FirebaseContext = createContext()


export const FirebaseContextProvider = ({children}) => {
    
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState()

  const logIn = async (email, password) => {
    try {
        setError(null)
        await signInWithEmailAndPassword(adminAuth, email, password)
        router.push("/dashboard")
    } catch(err) {
        setError(err.message)
    }
  }

  const logOut = async () => {
    try {
        setError(null)
        await signOut(adminAuth)
        router.push("/")
    } catch(err) {
        setError(err.message)
    }
  }


  useEffect(() => {
    const unsub = onAuthStateChanged(adminAuth, user => {
        if(user) {
            setCurrentUser(user)
            console.log("user has signed in", user)
        } else {
            setCurrentUser(null)
            console.log("user has signed out", user)
        }
    })

    return () => {
        unsub()
      }

  }, [])

  return (
    <FirebaseContext.Provider value={{currentUser, logIn, logOut, error}}>
        {children}
    </FirebaseContext.Provider>
  )
}

