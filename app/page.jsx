"use client";

import Image from "next/image";
import Link from "next/link";

const Login = () => {

  return (
    <main className="login-page pt-32 h-[calc(100vh-50px)] bg-[url('/images/bg-login.jpg')]">

      <form className="mx-auto w-fit flex flex-col bg-gray-400 text-gray-600 p-10">
        <h2 className="text-2xl text-center mb-8">Admin Login</h2>
        <label className="mb-6">
          <span className="block mb-1">Email:</span>
          <input type="email" />
        </label>
        <label>
          <span className="block mb-1">Password:</span>
          <input type="password" />
        </label>
        <button className="mt-5">Log In</button>
      </form>
    </main>
  );
}

export default Login
