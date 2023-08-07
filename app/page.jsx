"use client";

import { useFirebaseContext } from "./hooks/useFirebaseContext";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Login = () => {

  const router = useRouter()
  const {currentUser, logIn, success, error} = useFirebaseContext()

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    logIn(email, password)
  }

  useEffect(() => {
    // if user is logged in, redirect to dashboard
    if(currentUser) {
      router.push("/dashboard")
    }
  }, [currentUser])

  return (
    <main className="login-page pt-32 h-[calc(100vh-50px)] bg-[url('/images/bg-login-admin.jpg')]">
      <form className="flex flex-col bg-dcam-regular-blue bg-opacity-40 text-gray-100 rounded-md w-[340px] p-10 mx-auto" onSubmit={handleLogin}>
          <h1 className="text-2xl mb-5 text-center">Admin Login</h1>
          <label className="mb-4">
            <span className="block mb-2">Username:</span>
            <input className="w-full h-8 ps-2 rounded text-gray-800" type="text" ref={emailRef} autoFocus />
          </label>
          <label className="mb-8">
            <span className="block mb-2">Password:</span>
            <input className="w-full h-8 ps-2 rounded text-gray-800" type="password" ref={passwordRef}/>
          </label>
          <button className="inline-block h-10 bg-gray-400 hover:bg-gray-500 rounded">Sign In</button>
          <p className={`h-6 pt-3 text-sm ${error && "text-red-600"} ${success && "text-green-600"} text-center`}>{error && error}{success && success}</p>
        </form>
    </main>
  );
}

export default Login
